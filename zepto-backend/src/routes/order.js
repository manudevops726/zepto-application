const express = require('express');
const { Order, Product } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Place an order
router.post('/', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) return res.status(400).json({ message: "Product ID & quantity required" });

    const order = await Order.create({
      UserId: req.user.id,
      ProductId: productId,
      quantity
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
});

// Get all orders of logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: Product
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

module.exports = router;
