const crypto = require('crypto');
const { Order, User } = require('../models');
const razorpay = require('../config/razorpay');

exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({ where: { id: orderId, userId } });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.paymentStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'Order payment status is not pending' });
    }

    const amountInPaise = Math.round(order.totalAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.orderNumber,
    };

    const rzpOrder = await razorpay.orders.create(options);

    order.razorpayOrderId = rzpOrder.id;
    await order.save();

    const user = await User.findByPk(userId);

    return res.status(200).json({
      success: true,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      razorpayOrderId: rzpOrder.id,
      orderNumber: order.orderNumber,
      user: {
        name: user ? user.name : '',
        mobile: user ? user.mobile : ''
      }
    });

  } catch (error) {
    next(error);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const order = await Order.findOne({ where: { razorpayOrderId: razorpay_order_id } });
      
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found for this payment' });
      }

      order.razorpayPaymentId = razorpay_payment_id;
      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      await order.save();

      return res.status(200).json({ success: true, message: 'Payment verified' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    next(error);
  }
};
