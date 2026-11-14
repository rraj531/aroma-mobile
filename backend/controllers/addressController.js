const { Address } = require('../models');

// @desc    Add a new address
// @route   POST /api/addresses
// @access  Private
exports.addAddress = async (req, res, next) => {
  try {
    const { label, fullAddress, city, state, pincode, isDefault, street, addressLine1, name } = req.body;
    const finalAddress = fullAddress || street || addressLine1 || '';
    const finalLabel = label || name || 'Home';

    const existingAddresses = await Address.count({ where: { userId: req.user.id } });
    
    // If it's the first address, force it to be default
    const setAsDefault = existingAddresses === 0 ? true : (isDefault || false);

    if (setAsDefault) {
      await Address.update(
        { isDefault: false },
        { where: { userId: req.user.id } }
      );
    }

    const address = await Address.create({
      userId: req.user.id,
      label: finalLabel,
      fullAddress: finalAddress,
      city,
      state,
      pincode,
      isDefault: setAsDefault
    });

    res.status(201).json({
      success: true,
      address
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user addresses
// @route   GET /api/addresses
// @access  Private
exports.getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: { userId: req.user.id },
      order: [['isDefault', 'DESC']]
    });

    res.status(200).json({
      success: true,
      addresses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an address
// @route   PUT /api/addresses/:id
// @access  Private
exports.updateAddress = async (req, res, next) => {
  try {
    const { label, fullAddress, city, state, pincode, isDefault } = req.body;

    const address = await Address.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    if (isDefault && !address.isDefault) {
      await Address.update(
        { isDefault: false },
        { where: { userId: req.user.id } }
      );
    }

    address.label = label || req.body.name || address.label;
    address.fullAddress = fullAddress || req.body.street || req.body.addressLine1 || address.fullAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.pincode = pincode || address.pincode;
    if (isDefault !== undefined) {
      address.isDefault = isDefault;
    }

    await address.save();

    res.status(200).json({
      success: true,
      address
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an address
// @route   DELETE /api/addresses/:id
// @access  Private
exports.deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    const wasDefault = address.isDefault;
    await address.destroy();

    if (wasDefault) {
      const remainingAddress = await Address.findOne({
        where: { userId: req.user.id }
      });
      if (remainingAddress) {
        remainingAddress.isDefault = true;
        await remainingAddress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Set default address
// @route   PUT /api/addresses/:id/default
// @access  Private
exports.setDefaultAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    await Address.update(
      { isDefault: false },
      { where: { userId: req.user.id } }
    );

    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      address
    });
  } catch (error) {
    next(error);
  }
};
