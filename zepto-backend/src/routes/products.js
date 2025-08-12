const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    if (!req.user?.mobile) {
      return res.status(403).json({ error: 'You must verify your phone number before adding a product.' });
    }
    const { name, image, price } = req.body;
    const product = await Product.create({ name, image, price, addedBy: req.user.mobile });
    res.json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
