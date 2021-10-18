import {Router} from 'express';
import UserController from '../controllers/user';
import {auth} from '../middleware/auth';

const router = Router();

router.get('/users?',auth, UserController.getUsers);
router.get('/users/:username',auth, UserController.getUser);
router.post('/users/:username/follow',auth, UserController.follow);
router.delete('/users/:username/unfollow',auth, UserController.unfollow);

export default router;