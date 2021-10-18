import tokenService from '../../services/token';
import {userDTO} from '../../dtos/user';

export default async (user) => {
  const userData = userDTO(user);
  const tokens = tokenService.generate(userData);

  await tokenService.save(userData._id, tokens.refreshToken);

  return {
    ...tokens,
    ...userData,
  };
}