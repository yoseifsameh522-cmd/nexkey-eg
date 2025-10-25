const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ productId: String, name: String, price: Number, quantity: Number }],
  total: Number,
  paymentMethod: { type: String, enum: ['stripe', 'cod'], default: 'cod' },
  paymentStatus: { type: String, default: 'pending' },
  stripeSessionId: String,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
