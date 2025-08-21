const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// User Model
const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

// Product Model
const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.INTEGER,
  addedBy: DataTypes.STRING,
});

// Order Model
const Order = sequelize.define('Order', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Order, { foreignKey: 'userId' });
Product.hasMany(Order, { foreignKey: 'productId' });

module.exports = { sequelize, User, Product, Order };
