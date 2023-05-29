const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  stripeId: {
    type: String,
    required: false
  },
  products: {
    type: Object
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
