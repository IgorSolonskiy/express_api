import {Router} from 'express';
import UserController from '../controllers/user.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/users?',authMiddleware, UserController.getUsers);
router.get('/users/:username',authMiddleware, UserController.getUser);
router.post('/users/:username/follow',authMiddleware, UserController.follow);
router.delete('/users/:username/unfollow',authMiddleware, UserController.unfollow);

export default router;