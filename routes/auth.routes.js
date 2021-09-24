import {Router} from 'express';
import AuthController from '../controllers/auth.controller.js';
import {registrationRequest} from '../requests/registration.request.js';
import {loginRequest} from '../requests/login.request.js';

const router = Router();

router.post('/register',
    registrationRequest,
    AuthController.register);

router.post('/login',
    loginRequest,
    AuthController.login);

router.get('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);

export default router;