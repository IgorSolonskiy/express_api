export const authResource = (user) => {
  const {id, username, email, accessToken, name} = user;

  return {
    id,
    username,
    name,
    email,
    accessToken,
  };
};