const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', auth, async (req, res) => {
  if (!req.user?.mobile) {
    return res.status(403).json({ error: 'You must verify your phone number before adding a product.' });
  }
  try {
    const { name, image, price } = req.body;
    const product = await Product.create({ name, image, price, addedBy: req.user.mobile });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;
