import tokenService from '../../services/token.js';

export default async (user) => {
  const userData = user(user);
  const tokens = tokenService.generate(userData);

  await tokenService.save(userData._id, tokens.refreshToken);

  return {
    ...tokens,
    ...userData,
  };
}