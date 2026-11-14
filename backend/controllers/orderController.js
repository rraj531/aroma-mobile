const { sequelize, Order, OrderItem, CartItem, Product, Address } = require('../models');

// @desc    Place order
// @route   POST /api/orders
// @access  Private
exports.placeOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { addressId, paymentMethod, shippingAddress, items } = req.body;

    let cartItems = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }]
    });

    let isDirectItems = false;
    if ((!cartItems || cartItems.length === 0) && items && items.length > 0) {
      isDirectItems = true;
      cartItems = [];
      for (const it of items) {
        const prod = await Product.findByPk(it.productId);
        if (prod) {
          cartItems.push({
            productId: prod.id,
            quantity: it.quantity || 1,
            Product: prod
          });
        }
      }
    }

    if (!cartItems || cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    let address;
    if (addressId) {
      address = await Address.findOne({
        where: { id: addressId, userId: req.user.id }
      });
    } else if (shippingAddress) {
      address = await Address.create({
        userId: req.user.id,
        label: shippingAddress.label || 'Home',
        fullAddress: shippingAddress.fullAddress || shippingAddress.addressLine1 || 'Default Address',
        city: shippingAddress.city || 'Surat',
        state: shippingAddress.state || 'Gujarat',
        pincode: shippingAddress.pincode || '395001',
        isDefault: true
      }, { transaction });
    } else {
      address = await Address.findOne({
        where: { userId: req.user.id, isDefault: true }
      });
    }

    if (!address) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Address not found or does not belong to user' });
    }

    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.quantity * parseFloat(item.Product.price);
    });

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(100 + Math.random() * 900);
    const orderNumber = `AROMA-${dateStr}-${randomNum}`;

    const deliveryCharge = 0; 
    const discount = 0;
    const totalAmount = subtotal + deliveryCharge - discount;

    const normalizedPaymentMethod = (paymentMethod || 'cod').toLowerCase();

    const order = await Order.create({
      userId: req.user.id,
      addressId: address.id,
      orderNumber,
      subtotal,
      discount,
      deliveryCharge,
      totalAmount,
      paymentMethod: normalizedPaymentMethod
    }, { transaction });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        name: item.Product.name,
        brand: item.Product.brand,
        price: item.Product.price,
        quantity: item.quantity,
        image: item.Product.image
      }, { transaction });

      // Decrement stock
      item.Product.stockQuantity -= item.quantity;
      if (item.Product.stockQuantity <= 0) {
        item.Product.stockQuantity = 0;
        item.Product.stock = false;
      }
      await item.Product.save({ transaction });
    }

    if (!isDirectItems) {
      await CartItem.destroy({
        where: { userId: req.user.id },
        transaction
      });
    }

    await transaction.commit();

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

// @desc    Get my orders
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
      where: { userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ['image'] }]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    res.status(200).json({
      success: true,
      orders: rows,
      totalOrders: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ['id', 'name', 'brand', 'price', 'mrp', 'image'] }]
        },
        {
          model: Address
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: OrderItem }]
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.orderStatus !== 'placed' && order.orderStatus !== 'confirmed') {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled at this stage' });
    }

    order.orderStatus = 'cancelled';
    if (order.paymentStatus === 'paid') {
      order.paymentStatus = 'refunded';
    }
    await order.save({ transaction });

    for (const item of order.OrderItems) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        product.stockQuantity += item.quantity;
        product.stock = true;
        await product.save({ transaction });
      }
    }

    await transaction.commit();

    res.status(200).json({
      success: true,
      order,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
