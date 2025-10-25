const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, successUrl, cancelUrl, customer } = req.body;
    const line_items = items.map(item => ({
      price_data: {
        currency: 'egp',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl,
    });

    const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
    await Order.create({ items, total, paymentMethod: 'stripe', paymentStatus: 'pending', stripeSessionId: session.id, customer });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe error' });
  }
});

module.exports = router;
