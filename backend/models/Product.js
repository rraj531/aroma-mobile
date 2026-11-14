const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Mobile', 'TV', 'Laptop', 'Refrigerator', 'AC', 'Washing Machine', 'Cooler', 'Speaker', 'Accessories'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  mrp: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
  },
  image: {
    type: DataTypes.STRING(500),
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  video: {
    type: DataTypes.STRING(500),
  },
  description: {
    type: DataTypes.TEXT,
  },
  specifications: {
    type: DataTypes.JSON,
    defaultValue: {},
  }
}, {
  timestamps: true,
});

module.exports = Product;
