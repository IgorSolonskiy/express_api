import User from '../models/user.model.js';

const index = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (e) {
    next(e)
  }
};

const show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).catch(() => {
      res.status(204);
    });

    return res.json(user);
  } catch (e) {
    next(e)
  }
};

export default {
  index,
  show,
};