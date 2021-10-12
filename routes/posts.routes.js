import {Router} from 'express';
import PostController from '../controllers/post.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import {postPolicy} from '../middleware/policy.middleware.js';

const router = Router();

router.post('/posts', authMiddleware, PostController.create);
router.delete('/posts/:id', authMiddleware, postPolicy, PostController.destroy);
router.put('/posts/:id', authMiddleware, postPolicy, PostController.update);
router.get('/users/:user/posts', authMiddleware, PostController.getUserPosts);
router.get('/posts/feed', authMiddleware, PostController.getPostsFeed);

export default router;