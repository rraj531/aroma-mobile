const express = require('express');
const { addAddress, getAllAddresses, updateAddress, deleteAddress, setDefaultAddress } = require('../controllers/addressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(addAddress)
  .get(getAllAddresses);

router.route('/:id')
  .put(updateAddress)
  .delete(deleteAddress);

router.route('/:id/default')
  .put(setDefaultAddress);

module.exports = router;
