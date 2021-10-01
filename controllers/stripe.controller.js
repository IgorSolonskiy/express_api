import {config} from 'dotenv';
import Stripe from 'stripe';
import stripeService from '../services/stripe.service.js';

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
    const response = await stripe.customers.list({
      email: req.user.email,
      expand: ['data.subscriptions'],
    });

    if (!response.data.length)
      return res.status(204).json();

    const customer = response.data[0];
    const currentSubscription = customer.subscriptions.data[0];

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

const getPrice = async (req, res, next) => {
  try {
    const products = await stripe.prices.list();

    res.json(products);
  } catch (e) {
    next(e);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const {id} = req.params;

    await stripe.subscriptions.update(id, {
      cancel_at_period_end: true,
    });

    res.status(204).json();
  } catch (e) {
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const {id} = req.params;

    await stripe.paymentMethods.detach(
        id,
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
  unsubscribe,
  getPaymentMethod,
  deleteCard,
};