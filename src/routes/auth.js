import {Router} from 'express';
import AuthController from '../controllers/auth.js';
import {auth} from '../middleware/auth.js';
import {
  loginValidationRules,
  registerValidationRules,
} from '../validations/request.js';
import {validate} from '../middleware/validate.js';

const router = Router();

router.post('/register', registerValidationRules(), validate, AuthController.register);
router.post('/login', loginValidationRules(), validate, AuthController.login);
router.get('/profile', auth, AuthController.profile);
router.get('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);

export default router;