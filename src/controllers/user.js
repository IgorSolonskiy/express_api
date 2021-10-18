import User from '../models/user';
import userService from '../services/user';

const getUsers = async (req, res, next) => {
  try {
    const {username} = req.query;
    const users = await User.find({username: new RegExp(username, 'i')});
    const privateUsers = users.map(user => user.privateUser(req.user));

    return res.json(privateUsers);
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const {username} = req.params;
    const user = await User.findOne({username});

    return res.json(user.privateUser(req.user));
  } catch (e) {
    next(e);
  }
};

const follow = async (req, res, next) => {
  try {
    const {username} = req.params;
    const follower = await userService.follow(username, req.user);

    return res.json(follower.privateUser(req.user));
  } catch (e) {
    next(e);
  }
};

const unfollow = async (req, res, next) => {
  try {
    const {username} = req.params;
    await userService.unfollow(username, req.user);

    return res.status(204).json();
  } catch (e) {
    next(e);
  }
};

export default {
  getUsers,
  getUser,
  follow,
  unfollow,
};