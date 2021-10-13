export const user = (user) => {
  const {username, _id, email, name} = user;

  return {
    username, _id: _id.toString(), email, name,
  };
};