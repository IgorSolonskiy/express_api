import {Router} from 'express';
import UserController from '../controllers/user.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/users',authMiddleware, UserController.getUsers);
router.get('/users/:id',authMiddleware, UserController.getUser);

export default router;