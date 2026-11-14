const { User, Product, Order, OrderItem, Coupon, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.count({ where: { role: 'customer' } });
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();

    const revenueResult = await Order.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalRevenue']
      ],
      where: { paymentStatus: 'paid' },
      raw: true
    });
    const totalRevenue = revenueResult[0].totalRevenue || 0;

    const lowStockProducts = await Product.findAll({
      where: {
        [Op.or]: [
          { stock: false },
          { stockQuantity: { [Op.lte]: 5 } }
        ]
      },
      attributes: ['id', 'name', 'stock', 'stockQuantity', 'price', 'category']
    });

    const recentOrders = await Order.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: parseFloat(totalRevenue),
        lowStockCount: lowStockProducts.length
      },
      lowStockProducts,
      recentOrders
    });

  } catch (error) {
    next(error);
  }
};

exports.getAllOrdersAdmin = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = {};
    if (status) where.orderStatus = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'mobile'] },
        { model: OrderItem, include: [Product] }
      ]
    });

    return res.status(200).json({
      success: true,
      totalOrders: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      orders: rows
    });

  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus, status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const newOrderStatus = orderStatus || status;
    if (newOrderStatus) order.orderStatus = newOrderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order
    });

  } catch (error) {
    next(error);
  }
};

exports.getAllUsersAdmin = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['customer', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    next(error);
  }
};
