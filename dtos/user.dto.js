export const userDto = (user) => {
  const {username, _id, email} = user;

  return {
    username, id: _id.toString(), email,
  };
};