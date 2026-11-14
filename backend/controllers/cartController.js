const { CartItem, Product } = require('../models');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
  try {
    const items = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'brand', 'price', 'mrp', 'image', 'stock']
        }
      ]
    });

    let totalItems = 0;
    let totalPrice = 0;

    items.forEach(item => {
      totalItems += item.quantity;
      totalPrice += item.quantity * (item.Product ? parseFloat(item.Product.price) : 0);
    });

    res.status(200).json({
      success: true,
      items,
      totalItems,
      totalPrice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (!product.stock) {
      return res.status(400).json({ success: false, message: 'Product is out of stock' });
    }

    const [cartItem, created] = await CartItem.findOrCreate({
      where: { userId: req.user.id, productId },
      defaults: { quantity }
    });

    if (!created) {
      cartItem.quantity += parseInt(quantity, 10);
      await cartItem.save();
    }

    const updatedCart = await CartItem.findAll({
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
      items: updatedCart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
exports.updateQuantity = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      await CartItem.destroy({
        where: { userId: req.user.id, productId }
      });
    } else {
      const cartItem = await CartItem.findOne({
        where: { userId: req.user.id, productId }
      });
      if (cartItem) {
        cartItem.quantity = parseInt(quantity, 10);
        await cartItem.save();
      }
    }

    const updatedCart = await CartItem.findAll({
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
      items: updatedCart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    
    await CartItem.destroy({
      where: { userId: req.user.id, productId }
    });

    const updatedCart = await CartItem.findAll({
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
      items: updatedCart
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
exports.clearCart = async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: { userId: req.user.id }
    });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    next(error);
  }
};
