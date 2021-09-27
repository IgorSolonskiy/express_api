import authService from '../services/auth.service.js';
import {validationResult} from 'express-validator';
import {ApiError} from '../exceptions/api.js';
import {authResource} from '../resources/auth.resource.js';
import {tokenResource} from '../resources/token.resource.js';
import {profileResource} from '../resources/profile.resource.js';

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      ApiError.validationError('Invalid value', errors.array());

    const {email, password, username, name} = req.body;
    const user = await authService.registration(email, password, username, name);

    res.cookie('refreshToken', user.refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json(authResource(user));
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await authService.login(email, password);

    res.cookie('refreshToken', user.refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json(tokenResource(user));
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    await authService.logout(refreshToken);

    res.clearCookie('refreshToken');

    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    const user = await authService.refresh(refreshToken);

    res.cookie('refreshToken', user.refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json(tokenResource(user));
  } catch (e) {
    next(e);
  }
};

const profile = async (req, res, next) => {
  try {
    return res.status(201).json(profileResource(req.user));
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  logout,
  refresh,
  profile
};