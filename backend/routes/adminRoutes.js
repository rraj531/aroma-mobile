const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllOrdersAdmin,
  updateOrderStatus,
  getAllUsersAdmin,
  updateUserRole
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// All routes require login + admin role
router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/orders', getAllOrdersAdmin);
router.put('/orders/:id', updateOrderStatus);
router.get('/users', getAllUsersAdmin);
router.put('/users/:id/role', updateUserRole);

module.exports = router;
