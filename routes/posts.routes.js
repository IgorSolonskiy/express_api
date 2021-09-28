import {Router} from 'express';
import PostController from '../controllers/post.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';

const router = Router();

router.post('/posts',authMiddleware, PostController.create);
router.delete('/posts/:id',authMiddleware, PostController.destroy);
router.put('/posts/:id',authMiddleware, PostController.update);
router.get('/users/:user/posts',authMiddleware, PostController.index);

export default router;