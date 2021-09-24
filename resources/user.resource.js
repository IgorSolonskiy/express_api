export const userResource = (user) => {
  const {id, username, createdAt, name} = user;

  return {id, username, name, createdAt};
};

export const userResourceCollection = (users) => users.map(user => {
  const {id, username, createdAt, name} = user;

  return {id, username, name, createdAt};
});