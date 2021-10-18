import {Router} from 'express';
import {auth} from '../middleware/auth';
import StripeController from '../controllers/stripe';

const router = Router();

router.get('/subscriptions/price', auth, StripeController.getPrice);
router.post('/create-checkout-session', auth, StripeController.createCheckoutSession);
router.get('/subscription', auth, StripeController.getSubscription);
router.get('/payment_methods/:id', auth, StripeController.getPaymentMethod);
router.post('/customer/:id/payment_methods', auth, StripeController.createPaymentMethod);
router.delete('/payment_methods/:id/detach', auth, StripeController.deleteCard);
router.put('/subscriptions/:id/update', auth, StripeController.updateSubscription);

export default router;