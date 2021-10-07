import {config} from 'dotenv';
import {stripe} from '../controllers/stripe.controller.js';

config();

const createSession = async (stripe, lookup_key, username) => {
  const prices = await stripe.prices.list({
    lookup_keys: [lookup_key],
    expand: ['data.product'],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    payment_method_types: ['card'],
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.APP_URL}${username}/subscriptions?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}${username}/subscriptions?canceled=true`,
  });

  return session.url;
};

const getSubscription = async (email) => {
  const response = await stripe.customers.list({
    email: email,
    expand: ['data.subscriptions'],
  });

  if (!response.data.length)
    return null;

  const customer = response.data[0];

  return customer.subscriptions.data[0];
};

const setPaymentMethod = async (payment_method, customer, subscription_id) => {
  const paymentMethod = await stripe.paymentMethods.create(payment_method);
  const attachedPaymentMethod = await stripe.paymentMethods.attach(
      paymentMethod.id, {customer});
  await stripe.subscriptions.update(subscription_id,
      {default_payment_method: paymentMethod.id},
  );

  return attachedPaymentMethod;
};

export default {
  getSubscription,
  createSession,
  setPaymentMethod,
};