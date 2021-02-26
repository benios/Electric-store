const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true, index: true },
  products: { type: Array, required: true },
  date: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
