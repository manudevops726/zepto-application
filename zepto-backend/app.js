const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models'); // ✅ adjust path based on actual folder
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Database sync and server start
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
      console.log(`✅ Server running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });
