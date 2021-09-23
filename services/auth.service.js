import User from '../Models/user.model.js';
import bcrypt from 'bcrypt';

const registration = async (email, password, username) => {
  const user = await User.findOne({email});

  if (user)
    throw new Error('User with this email already exists');

  const hashPassword = await bcrypt.hash(password,3)
  const newUser = await User.create({email, password: hashPassword, username});
};

export default {
  registration
}