const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/create-order', paymentController.createRazorpayOrder);
router.post('/create-razorpay-order', paymentController.createRazorpayOrder);
router.post('/verify', paymentController.verifyPayment);
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;
