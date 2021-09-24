import jwt from 'jsonwebtoken';
import Token from '../models/token.model.js';

const generate = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
      {expiresIn: '15m'});
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,
      {expiresIn: '3d'});

  return {
    accessToken,
    refreshToken,
  };
};

const save = async (userId, refreshToken) => {
  const token = await Token.findOne({user: userId});

  if (token) {
    token.refreshToken = refreshToken;

    return token.save();
  }

  return await Token.create(({user: userId, refreshToken}));
};

const removeToken = async (refreshToken) => await Token.deleteOne(
    {refreshToken});

const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (e) {
    return null;
  }
};

const findToken = async (refreshToken) => await Token.findOne(
    {refreshToken});


export default {
  save,
  generate,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken
};