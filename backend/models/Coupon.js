const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Coupon = sequelize.define('Coupon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
    set(value) {
      this.setDataValue('code', value ? value.toUpperCase() : value);
    },
  },
  discountType: {
    type: DataTypes.ENUM('percentage', 'fixed'),
    allowNull: false,
  },
  discountValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  maxDiscount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  minOrderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  usageLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  usedCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  validFrom: {
    type: DataTypes.DATE,
  },
  validTill: {
    type: DataTypes.DATE,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  applicableCategories: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  applicableBrands: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
}, {
  tableName: 'coupons',
  timestamps: true,
});

module.exports = Coupon;
