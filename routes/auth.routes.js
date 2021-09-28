import {Router} from 'express';
import AuthController from '../controllers/auth.controller.js';
import {authMiddleware} from '../middleware/auth.middleware.js';
import {
  loginValidationRules,
  registerValidationRules,
} from '../validations/request.validation.js';
import {validateMiddleware} from '../middleware/validate.middleware.js';

const router = Router();

router.post('/register', registerValidationRules(), validateMiddleware, AuthController.register);
router.post('/login', loginValidationRules(), validateMiddleware, AuthController.login);
router.get('/profile', authMiddleware, AuthController.profile);
router.get('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);

export default router;