export const profileResource = (user) => {
  const {id, username, email} = user;

  return {id, username, email};
};