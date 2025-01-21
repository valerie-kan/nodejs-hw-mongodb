import * as authServices from '../services/auth.js';

const createCookies = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const registeredUser = await authServices.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: registeredUser.name,
      email: registeredUser.email,
    },
  });
};

export const resetPasswordController = async (req, res, next) => {
  await authServices.resetPassword(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.loginUser(req.body);

  createCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const newSession = await authServices.refreshUser({
    refreshToken,
    sessionId,
  });

  createCookies(res, newSession);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const verifyController = async (req, res) => {
  // const { token } = req.query;
};
