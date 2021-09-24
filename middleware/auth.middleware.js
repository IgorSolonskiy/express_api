import {ApiError} from '../exceptions/api.js';
import tokenService from '../services/token.service.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return next(ApiError.unauthorizedError());

    const accessToken = authHeader.split((' '))[1];

    if (!accessToken)
      return next(ApiError.unauthorizedError());

    const user = tokenService.validateAccessToken(accessToken);

    if (!user)
      return next(ApiError.unauthorizedError());

    req.user = user;
    next();
  } catch (e) {
    return next(ApiError.unauthorizedError());
  }
};