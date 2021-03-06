import {Router} from 'express';
import PostController from '../controllers/post';
import {auth} from '../middleware/auth';
import {postPolicy} from '../middleware/policy';

const router = Router();

router.post('/posts', auth, PostController.create);
router.delete('/posts/:id', auth, postPolicy, PostController.destroy);
router.put('/posts/:id', auth, postPolicy, PostController.update);
router.get('/users/:user/posts', auth, PostController.getUserPosts);
router.get('/posts/feed', auth, PostController.getPostsFeed);

export default router;