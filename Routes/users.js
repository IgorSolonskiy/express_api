import {Router} from 'express';
import User from '../Models/user.js';

const router = Router();

router.get('/users', (req, res) => {
  return res.json('server is work');
});

router.post('/users', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const user = await User.create({username, email, password}).catch(e => {
      if (e.errors)
        res.status(422).json(e.message);

      if (e.code === 11000)
        res.status(422).json('This email already exists');
    });

    res.json(user);
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
});

export default router;