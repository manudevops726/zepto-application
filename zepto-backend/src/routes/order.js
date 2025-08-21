const express = require('express');
const { Order, Product } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Place new order
router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) return res.status(400).json({ message: 'Product and quantity required' });

  try {
    const order = await Order.create({ productId, quantity, UserId: req.user.id });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
});

// View user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { UserId: req.user.id }, include: Product });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

module.exports = router;
