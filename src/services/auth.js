import User from '../models/user.js';
import bcrypt from 'bcrypt';
import tokenService from './token.js';
import {ApiError} from '../exceptions/api.js';
import generateAuthData from '../helpers/auth/generate.auth.data.js';

const registration = async (email, password, username, name) => {
  const user = await User.findOne({email});

  if (user)
    ApiError.unprocessableError('User with this email already exists');

  const hashPassword = await bcrypt.hash(password, 3);
  const newUser = await User.create({email, password: hashPassword, username, name});

  return generateAuthData(newUser);
};

const login = async (email, password) => {
  const user = await User.findOne({email});

  if (!user)
    ApiError.unprocessableError('No such user exists');

  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals)
    ApiError.unprocessableError('You entered an incorrect password');

  return generateAuthData(user);
};

const logout = async (refreshToken) => await tokenService.removeToken(
    refreshToken);

const refresh = async (refreshToken) => {
  if (!refreshToken)
    ApiError.unauthorizedError();

  const user = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = await tokenService.findToken(refreshToken);

  if (!user || !tokenFromDb)
    ApiError.unauthorizedError();

  const updatedUser = await User.findById(user._id);

  return generateAuthData(updatedUser);
};

export default {
  registration,
  login,
  logout,
  refresh,
};