const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userName: String,
  product: String,
  date: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
