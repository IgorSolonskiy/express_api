import authService from '../services/auth.service.js';
import {validationResult} from 'express-validator';
import {ApiError} from '../exceptions/api.js';

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      ApiError.validationError('Invalid value', errors.array());

    const {email, password, username} = req.body;
    const user = await authService.registration(email, password, username);

    res.cookie('refreshToken', user.refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});

    return res.status(201).json(user);
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

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    const token = await authService.logout(refreshToken)

    res.clearCookie('refreshToken');

    return res.json(token)
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

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  logout,
  refresh,
};