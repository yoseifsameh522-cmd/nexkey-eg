const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { items, total, paymentMethod, customer, stripeSessionId } = req.body;
    const order = await Order.create({ items, total, paymentMethod, customer, stripeSessionId, paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'فشل إنشاء الطلب' });
  }
});

router.get('/', async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
