import {Router} from 'express';
import {authMiddleware} from '../middleware/auth.middleware.js';
import StripeController from '../controllers/stripe.controller.js';

const router = Router();

router.get('/subscriptions/price', authMiddleware, StripeController.getPrice);
router.post('/create-checkout-session', authMiddleware, StripeController.createCheckoutSession);
router.get('/subscriptions', authMiddleware, StripeController.getSubscriptions);

export default router;