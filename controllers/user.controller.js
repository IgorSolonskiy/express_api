import User from '../models/user.model.js';
import userService from '../services/user.service.js';

const index = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    const privateUsers = users.map(user => user.privateUser);

    return res.json(privateUsers);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  try {
    const {username} = req.params;

    const user = await User.findOne({username}).catch(() => {
      res.status(204);
    });

    return res.json(user.privateUser);
  } catch (e) {
    next(e);
  }
};

export default {
  index,
  show,
};