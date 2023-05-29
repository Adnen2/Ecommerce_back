const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// POST a new order
router.post('/', async (req, res) => {
  const order = new Order({
    stripeId: req.body.stripeId,
    products: req.body.products
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a category
router.patch("/:id", getOrder, async (req, res) => {
  if (req.body.stripeId != null) {
    res.order.stripeId = req.body.stripeId;
  }
  if (req.body.products != null) {
    res.order.products = req.body.products;
  }
  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE an order
router.delete('/:id', getOrder, async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findByIdAndDelete(id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Cannot find order' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.order = order;
  next();
}

module.exports = router;
