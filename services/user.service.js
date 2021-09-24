import User from '../models/user.model.js';

const getUsers = async () => await User.find()

export default {
  getUsers
}