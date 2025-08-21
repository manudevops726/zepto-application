// src/models/index.js

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// ✅ DB connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false,
  }
);

// ✅ Product Model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  addedBy: {
    type: DataTypes.STRING, // stores user email if added via POST
    allowNull: true,
  }
});

// ✅ User Model (for auth)
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// ✅ Order Model (to track user orders)
const Order = sequelize.define('Order', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // pending, completed, cancelled
  }
});

// ✅ Relationships
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = { sequelize, Product, User, Order };
