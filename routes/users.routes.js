import {Router} from 'express';
import UserController from '../controllers/user.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = Router();

router.get('/users',authMiddleware, UserController.index);
router.get('/users/:id',authMiddleware, UserController.show);

export default router;