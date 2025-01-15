import createError from 'http-errors';

import { getSession, getUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createError(401, 'Authorization header not found'));
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    return next(createError(401, 'Header must be bearer type'));
  }

  const session = await getSession(token);
  if (!session) {
    return next(createError(401, 'User not found'));
  }

  if (Date.now() > session.accessTokenValidUntil) {
    return next(createError(401, 'Access token expired'));
  }

  const user = await getUser(session.userId);
  if (!user) {
    return next(createError(401, 'User not found'));
  }

  req.user = user;

  next();
};
