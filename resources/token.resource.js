export const tokenResource = (user) => {
  const {accessToken} = user;

  return {
    accessToken,
  };
};