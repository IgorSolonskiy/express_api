import {Router} from 'express';
import UserController from '../controllers/user';
import {auth} from '../middleware/auth';
import upload from '../core/multer';

const router = Router();

router.put('/profile', auth, upload.single('avatar'), UserController.updateProfile);
router.get('/uploads/:id', UserController.getUploads);
router.get('/users?', auth, UserController.getUsers);
router.get('/users/:username', auth, UserController.getUser);
router.post('/users/:username/follow', auth, UserController.follow);
router.delete('/users/:username/unfollow', auth, UserController.unfollow);

export default router;