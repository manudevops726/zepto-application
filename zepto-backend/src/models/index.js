const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'const { Sequelize, DataTypes } = require('sequelize');
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

const User = sequelize.define('User', {
  mobile: { type: DataTypes.STRING, allowNull: false, unique: true },
  otp: DataTypes.STRING,
  verified: DataTypes.BOOLEAN,
});

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.INTEGER,
  addedBy: DataTypes.STRING,
});

module.exports = { sequelize, User, Product };

  }
);

const User = sequelize.define('User', {
  mobile: { type: DataTypes.STRING, allowNull: false, unique: true },
  otp: DataTypes.STRING,
  verified: DataTypes.BOOLEAN
});

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  price: DataTypes.INTEGER,
  addedBy: DataTypes.STRING
});

module.exports = { sequelize, User, Product };
