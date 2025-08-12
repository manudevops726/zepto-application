const express = require('express');
const router = express.Router();
const { User } = require('../models');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Request OTP
router.post('/request-otp', async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: 'Mobile number required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await User.upsert({ mobile, otp, verified: false });

    await client.messages.create({
      body: `Your OTP for Manasa Rao - Groceries is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile.startsWith('+') ? mobile : `+91${mobile}`
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) return res.status(400).json({ message: 'Mobile and OTP required' });

  try {
    const user = await User.findOne({ where: { mobile } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp) {
      return res.status(403).json({ message: 'Invalid OTP' });
    }

    user.verified = true;
    user.otp = null;
    await user.save();

    // Send alert email on successful login
    await transporter.sendMail({
      from: `"Zepto - Manasa Rao" <${process.env.EMAIL_USER}>`,
      to: process.env.ALERT_EMAIL,
      subject: 'User Logged In',
      text: `User with mobile ${mobile} just logged in.`
    });

    const token = jwt.sign({ mobile: user.mobile }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error: error.message });
  }
});

module.exports = router;
