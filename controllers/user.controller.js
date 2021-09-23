import User from '../models/user.model.js';

const index = async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (e) {
    return res.status(500).json('Internal Server Error');
  }
};

const show = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).catch(() => {
      res.status(204);
    });

    return res.json(user);
  } catch (e) {
    return res.status(500).json('Internal Server Error');
  }
};

export default {
  index,
  show,
};