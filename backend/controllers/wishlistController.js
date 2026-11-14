const { WishlistItem, Product } = require('../models');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
  try {
    const items = await WishlistItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'brand', 'price', 'mrp', 'image', 'stock']
        }
      ]
    });

    res.status(200).json({
      success: true,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle item in wishlist
// @route   POST /api/wishlist/:productId
// @access  Private
exports.toggleWishlist = async (req, res, next) => {
  try {
    const productId = req.params.productId || req.body.productId;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const existingItem = await WishlistItem.findOne({
      where: { userId: req.user.id, productId }
    });

    let action;
    if (existingItem) {
      await existingItem.destroy();
      action = 'removed';
    } else {
      await WishlistItem.create({ userId: req.user.id, productId });
      action = 'added';
    }

    const items = await WishlistItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'brand', 'price', 'mrp', 'image', 'stock']
        }
      ]
    });

    res.status(200).json({
      success: true,
      action,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    
    await WishlistItem.destroy({
      where: { userId: req.user.id, productId }
    });

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist'
    });
  } catch (error) {
    next(error);
  }
};
