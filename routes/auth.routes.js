import {Router} from 'express';
import AuthController from '../controllers/auth.controller.js';
import {body} from 'express-validator';

const router = Router();

router.post('/register',
    body('email').isString().isEmail(),
    body('username').isString().isLength({min: 2, max: 20}),
    body('password').isString().isLength({min: 3, max: 32}),
    AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);

export default router;