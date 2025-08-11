const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // No token: skip authentication, or block access if route is protected
    return res.status(403).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === 'null') {
    return res.status(403).json({ error: 'Token missing or invalid' });
  }

  console.log('token:', token);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};