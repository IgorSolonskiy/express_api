import {ApiError} from '../exceptions/api';
import tokenService from '../services/token';

export const auth = (req, res, next) => {
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

    const {username,name,email,_id} = user

    req.user = {username,name,email,_id};
    next();
  } catch (e) {
    return next(ApiError.unauthorizedError());
  }
};