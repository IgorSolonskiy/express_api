import {Router} from 'express';
import AuthController from '../controllers/auth.controller.js';
import {body} from 'express-validator';

const router = Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);

export default router;