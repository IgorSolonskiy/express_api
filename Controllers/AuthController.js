import User from '../Models/user.js';

const register = async (req, res) => {
  try {
    const user = await User.create(req.body).catch(e => {
      if (e.errors)
        res.status(422).json(e.message);

      if (e.code === 11000)
        res.status(422).json('This email already exists');
    });

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
};

export default {
  register
};