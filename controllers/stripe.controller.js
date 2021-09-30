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

const getSubscriptions = async (req, res, next) => {
  try {
    const response = await stripe.customers.list({
      email: req.user.email,
      expand: ['data.subscriptions'],
    });

    if (!response.data.length)
      return res.json(response.data);

    const customer = response.data[0];

    res.json(customer.subscriptions.data);
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

export default {
  getPrice,
  createCheckoutSession,
  getSubscriptions,
};