import authService from '../services/auth.service.js';

const register = async (req, res) => {
  try {
    const {email, password, username} = req.body;
    const user = await authService.registration(email, password, username);

    res.cookie('refreshToken', user.refreshToken,
        {maxAge: process.env.JWT_REFRESH_TIME_LIFE, httpOnly: true});
    return res.status(201).json(user);
  } catch (e) {
    if (e.statusCode === 422)
      return res.status(422).json(e.message);

    return res.status(500).json('Internal Server Error');
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
  refresh,
};