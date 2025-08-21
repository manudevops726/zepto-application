const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === 'null') {
    return res.status(403).json({ error: 'Token missing or invalid' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
