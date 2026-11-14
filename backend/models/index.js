const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const CartItem = require('./CartItem');
const WishlistItem = require('./WishlistItem');
const Address = require('./Address');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Coupon = require('./Coupon');
const CouponUsage = require('./CouponUsage');
const Review = require('./Review');

// CartItem Associations
User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(User, { foreignKey: 'userId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// WishlistItem Associations
User.hasMany(WishlistItem, { foreignKey: 'userId' });
WishlistItem.belongsTo(User, { foreignKey: 'userId' });
WishlistItem.belongsTo(Product, { foreignKey: 'productId' });

// Address Associations
User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

// Order Associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Address, { foreignKey: 'addressId' });

// OrderItem Associations
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Coupon Associations
Coupon.hasMany(CouponUsage, { foreignKey: 'couponId' });
CouponUsage.belongsTo(Coupon, { foreignKey: 'couponId' });
CouponUsage.belongsTo(User, { foreignKey: 'userId' });
CouponUsage.belongsTo(Order, { foreignKey: 'orderId' });
User.hasMany(CouponUsage, { foreignKey: 'userId' });

// Review Associations
User.hasMany(Review, { foreignKey: 'userId' });
Product.hasMany(Review, { foreignKey: 'productId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  Product,
  CartItem,
  WishlistItem,
  Address,
  Order,
  OrderItem,
  Coupon,
  CouponUsage,
  Review
};
