import {Router} from 'express';
import AuthController from '../Controllers/AuthController.js';

const router = Router();

router.post('/register', AuthController.register);

export default router;