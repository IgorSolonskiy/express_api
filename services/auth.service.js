import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import tokenService from './token.service.js';
import {userDto} from '../dtos/user.dto.js';
import {ApiError} from '../exceptions/api.js';

const registration = async (email, password, username) => {
  const user = await User.findOne({email});

  if (user)
    ApiError.unprocessableError('User with this email already exists');

  const hashPassword = await bcrypt.hash(password, 3);
  const newUser = await User.create({email, password: hashPassword, username});
  const userData = userDto(newUser);
  const tokens = tokenService.generate(userData);

  await tokenService.save(userData.id, tokens.refreshToken);

  return {
    ...tokens,
    ...userData,
  };
};

export default {
  registration,
};