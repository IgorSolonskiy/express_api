import {config} from 'dotenv';
import Stripe from 'stripe';
import stripeService from '../services/stripe.js';

config();

export const stripe = new Stripe(process.env.STRIPE_ST_TEST);

const createCheckoutSession = async (req, res, next) => {
  try {
    const session = await stripeService.createSession(stripe,
        req.body.lookup_key, req.user.username);

    res.json(session);
  } catch (e) {
    next(e);
  }
};

const getSubscription = async (req, res, next) => {
  try {
    const currentSubscription = await stripeService.getSubscription(
        req.user.email);

    if (!currentSubscription)
      return res.status(204).json();

    res.json(currentSubscription);
  } catch (e) {
    next(e);
  }
};

const getPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
        req.params.id,
    );

    res.json(paymentMethod);
  } catch (e) {
    next(e);
  }
};

const createPaymentMethod = async (req, res, next) => {
  try {
    const attachedPaymentMethod = await stripeService.setPaymentMethod(
        req.body.payment_method, req.params.id, req.body.subscription_id);

    res.json(attachedPaymentMethod);
  } catch (e) {
    next(e);
  }
};

const getPrice = async (req, res, next) => {
  try {
    const products = await stripe.prices.list();

    res.json(products);
  } catch (e) {
    next(e);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const updatedSubscription = await stripe.subscriptions.update(req.params.id, req.body);

    res.json(updatedSubscription);
  } catch (e) {
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    await stripe.paymentMethods.detach(
        req.params.id,
    );

    res.status(204).json();
  } catch (e) {
    next(e);
  }
};

export default {
  getPrice,
  createCheckoutSession,
  getSubscription,
  updateSubscription,
  getPaymentMethod,
  deleteCard,
  createPaymentMethod,
};