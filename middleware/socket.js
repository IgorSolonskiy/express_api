import tokenService from '../services/token.js';
import User from '../models/user.js';

export const onConnect = async (client, next) => {
  const {accessToken} = client.handshake.auth;

  if (!accessToken) {
    return next(new Error('invalid username'));
  }

  const connectedUser = tokenService.validateAccessToken(accessToken);

  const {followings} = await User.findById(connectedUser._id)
      .populate('followings');

  followings.forEach(user => client.join(user.username));

  next();
};