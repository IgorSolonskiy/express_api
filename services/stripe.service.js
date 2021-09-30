import {config} from 'dotenv';

config();

const createSession = async (stripe, lookup_key,username) => {
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

export default {
  createSession
}