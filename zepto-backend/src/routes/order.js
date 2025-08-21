const express = require('express');
const router = express.Router();
const { Order, Product, User } = require('../models');
const auth = require('../middleware/auth');

// Place an order
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const order = await Order.create({
      productId,
      quantity,
      userId: req.user.id,
    });

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order', details: error.message });
  }
});

// Get all orders of logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [Product],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

module.exports = router;
