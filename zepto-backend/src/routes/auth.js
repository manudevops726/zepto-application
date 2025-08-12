const express = require('express');
const router = express.Router();
const { User } = require('../models');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Request OTP
router.post('/request-otp', async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ error: 'Mobile number required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.upsert({ mobile, otp, verified: false });

  try {
    await client.messages.create({
      body: `Your OTP for Manasa Rao - Groceries is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile.startsWith('+') ? mobile : `+91${mobile}`
    });

    // Send alert email on user OTP request
    await transporter.sendMail({
      from: `"Manasa Rao - Groceries" <${process.env.EMAIL_USER}>`,
      to: process.env.ALERT_EMAIL,
      subject: `OTP Requested for ${mobile}`,
      text: `OTP ${otp} was requested by user with mobile number ${mobile}`
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP & issue JWT token
router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });

  try {
    const user = await User.findOne({ where: { mobile, otp } });
    if (!user) return res.status(401).json({ error: 'Invalid OTP' });

    user.verified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ mobile }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
