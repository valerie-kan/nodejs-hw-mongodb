import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import path from 'path';
import { readFile } from 'node:fs/promises';
import Handlebars from 'handlebars';
import jwt from 'jsonwebtoken';

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/users.js';

import { TEMPLATES_DIR } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';

const emailTemplatePath = path.join(TEMPLATES_DIR, 'verify-email.html');
const emailTemplate = await readFile(emailTemplatePath, 'utf-8');

const appDomain = getEnvVar('APP_DOMAIN');
const jwtSecret = getEnvVar('JWT_SECRET');

const createNewSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: accessTokenLifeTime,
  refreshTokenValidUntil: refreshTokenLifeTime,
});

export const registerUser = async (userData) => {
  const { email, password } = userData;
  const findedUser = await UserCollection.findOne({ email });
  if (findedUser) {
    throw createError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...userData,
    password: hashPassword,
  });

  const template = Handlebars.compile(emailTemplate);

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '5min' });

  const html = template({
    link: `${appDomain}/reset-password?token=${token}`,
  });

  const verifyEmail = {
    to: email,
    subject: 'Verify your email',
    html,
  };

  await sendEmail(verifyEmail);

  return newUser;
};

export const loginUser = async (userData) => {
  const { email, password } = userData;
  const findedUser = await UserCollection.findOne({ email });
  if (!findedUser) {
    throw createError(401, 'Email or password is wrong');
  }

  if (!findedUser.verified) {
    throw createError(401, 'Email is not verified');
  }

  const isEqualPasswords = await bcrypt.compare(password, findedUser.password);
  if (!isEqualPasswords) {
    throw createError(401, 'Email or password is wrong');
  }

  await SessionCollection.deleteOne({ userId: findedUser._id });

  const newSessionData = createNewSession();

  return await SessionCollection.create({
    userId: findedUser._id,
    ...newSessionData,
  });
};

export const refreshUser = async (sessionInfo) => {
  const session = await SessionCollection.findOne({
    _id: sessionInfo.sessionId,
    refreshToken: sessionInfo.refreshToken,
  });
  if (!session) {
    throw createError(401, 'Session not found');
  }

  if (Date.now() > session.refreshTokenValidUntil) {
    throw createError(401, 'Refresh token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionInfo.sessionId });

  const newSessionData = createNewSession();

  return SessionCollection.create({
    userId: session.userId,
    ...newSessionData,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const getSession = (token) =>
  SessionCollection.findOne({ accessToken: token });

export const getUser = (id) => UserCollection.findOne({ _id: id });
