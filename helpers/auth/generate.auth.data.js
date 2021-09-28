import {userDto} from '../../dtos/user.dto.js';
import tokenService from '../../services/token.service.js';

export default async (user) => {
  const userData = userDto(user);
  const tokens = tokenService.generate(userData);

  await tokenService.save(userData._id, tokens.refreshToken);

  return {
    ...tokens,
    ...userData,
  };
}