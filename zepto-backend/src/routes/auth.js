const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');
require('dotenv').config();

router.post('/request-otp', async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.upsert({ mobile, otp, verified: false });

  console.log(`OTP for ${mobile}: ${otp}`);  // For testing, log OTP to console

  res.json({ message: 'OTP sent (mocked)' });
});

router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({ where: { mobile, otp } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  user.verified = true;
  await user.save();

  const token = jwt.sign({ mobile }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;