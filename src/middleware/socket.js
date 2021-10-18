import tokenService from '../services/token';
import User from '../models/user';

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