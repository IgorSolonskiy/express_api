import {Router} from 'express';
import UserController from '../Controllers/UserController.js';

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);

export default router;