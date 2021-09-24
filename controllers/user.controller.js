import User from '../models/user.model.js';
import userService from '../services/user.service.js';
import {userResource} from '../resources/user.resource.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    return res.json(users);
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).catch(() => {
      res.status(204);
    });

    return res.json(userResource(user));
  } catch (e) {
    next(e);
  }
};

export default {
  getUsers,
  getUser,
};