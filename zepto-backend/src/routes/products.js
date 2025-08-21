const express = require('express');
const { Product } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Add product (only logged in users)
router.post('/', auth, async (req, res) => {
  try {
    const { name, image, price } = req.body;
    const product = await Product.create({ name, image, price, addedBy: req.user.email });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
});

module.exports = router;
