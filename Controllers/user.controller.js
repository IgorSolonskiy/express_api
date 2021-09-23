import User from '../Models/user.model.js';

const index = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
};

const show = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id).catch(() => {
      res.status(204);
    });

    res.json(user);
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
};

export default {
  index,
  show
};