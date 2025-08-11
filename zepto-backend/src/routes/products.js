const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Product } = require('../models');

router.get('/', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

router.post('/', auth, async (req, res) => {
  const { name, image, price } = req.body;
  const product = await Product.create({ name, image, price, addedBy: req.user.mobile });
  res.json(product);
});

module.exports = router;