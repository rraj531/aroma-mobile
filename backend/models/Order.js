const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  addressId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'addresses',
      key: 'id'
    }
  },
  orderNumber: {
    type: DataTypes.STRING(30),
    unique: true
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  couponCode: {
    type: DataTypes.STRING(30)
  },
  deliveryCharge: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('razorpay', 'cod'),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  razorpayOrderId: {
    type: DataTypes.STRING(100)
  },
  razorpayPaymentId: {
    type: DataTypes.STRING(100)
  },
  orderStatus: {
    type: DataTypes.ENUM('placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'),
    defaultValue: 'placed'
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;
