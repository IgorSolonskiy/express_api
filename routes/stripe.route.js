import {Router} from 'express';
import {authMiddleware} from '../middleware/auth.middleware.js';
import StripeController from '../controllers/stripe.controller.js';

const router = Router();

router.get('/subscriptions/price', authMiddleware, StripeController.getPrice);
router.post('/create-checkout-session', authMiddleware, StripeController.createCheckoutSession);
router.get('/subscription', authMiddleware, StripeController.getSubscription);
router.get('/payment_methods/:id', authMiddleware, StripeController.getPaymentMethod);
router.delete('/payment_methods/:id/detach', authMiddleware, StripeController.deleteCard);
router.put('/subscriptions/:id/update', authMiddleware, StripeController.update);

export default router;