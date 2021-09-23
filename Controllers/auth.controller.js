import User from '../Models/user.model.js';

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

const login = async (req, res) => {
  try {
    res.status(201).json();
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
};

const logout = async (req, res) => {
  try {
    res.status(201).json();
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
};

const refresh = async (req, res) => {
  try {
    res.status(201).json();
  } catch (e) {
    res.status(500).json('Internal Server Error');
  }
};

export default {
  register,
  login,
  logout,
  refresh
};