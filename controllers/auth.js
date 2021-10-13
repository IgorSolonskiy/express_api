import authService from '../services/auth.js';
import {validationResult} from 'express-validator';
import {ApiError} from '../exceptions/api.js';

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      ApiError.validationError('Invalid value', errors.array());

    const {email, password, username, name} = req.body;
    const {refreshToken, accessToken} = await authService.registration(email, password, username, name);

    res.cookie('refreshToken', refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json({accessToken});
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const {refreshToken,accessToken} = await authService.login(email, password);

    res.cookie('refreshToken', refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json({accessToken});
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
    const {refreshToken, accessToken} = await authService.refresh(req.cookies.refreshToken);

    res.cookie('refreshToken', refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json({accessToken});
  } catch (e) {
    next(e);
  }
};

const profile =  (req, res, next) => {
  try {
    return res.status(201).json(req.user);
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  logout,
  refresh,
  profile,
};