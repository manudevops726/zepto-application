const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');
const orderRoutes = require('./src/routes/order'); // NEW

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    appName: "Manasa Rao - Groceries",
    caption: "Healthy and Organic"
  });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes); // NEW

sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
