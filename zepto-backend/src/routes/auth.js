const express = require('express');
const router = express.Router();

const { User } = require('../models');  // Adjust path as needed
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/request-otp', async (req, res) => {
  const { mobile } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.upsert({ mobile, otp, verified: false });

  try {
    await client.messages.create({
      body: `Your OTP for Zepto-Manasa Rao is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile.startsWith('+') ? mobile : `+91${mobile}`
    });
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

module.exports = router;
