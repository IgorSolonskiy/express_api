export const userResource = (user) => {
  const {id, username, createdAt, name} = user;

  return {id, username,name, createdAt};
};