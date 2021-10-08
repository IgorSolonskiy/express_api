import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const usersSeed = async () => {
  return await User.create([
    {
      'username': 'Igor666',
      'name': 'Igor Solonskiy',
      'email': 'igor@gmail.com',
      'password': await bcrypt.hash('password', 3),
    },
    {
      'username': 'Den666',
      'name': 'Den Ivanov',
      'email': 'den@gmail.com',
      'password': await bcrypt.hash('password', 3),
    },
    {
      'username': 'Mike666',
      'name': 'Mike Jakson',
      'email': 'mike@gmail.com',
      'password': await bcrypt.hash('password', 3),
    },
    {
      'username': 'Vlad444',
      'name': 'Vlad Ivanov',
      'email': 'midke@gmail.com',
      'password': await bcrypt.hash('password', 3),
    },
  ]);
};