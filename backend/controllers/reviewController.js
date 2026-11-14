const { Review, User, Product, Order, OrderItem } = require('../models');

exports.createReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ success: false, message: 'Product ID and rating are required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({ where: { userId, productId } });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    // Check verified purchase
    const userOrders = await Order.findAll({
      where: { userId, paymentStatus: 'paid' },
      include: [{ model: OrderItem, where: { productId } }]
    });
    const verifiedPurchase = userOrders.length > 0;

    const review = await Review.create({
      userId,
      productId,
      rating: parseInt(rating),
      title,
      comment,
      verifiedPurchase
    });

    // Update product rating and reviews count
    const allReviews = await Review.findAll({ where: { productId } });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = (totalRating / allReviews.length).toFixed(1);

    product.rating = avgRating;
    product.reviewCount = allReviews.length;
    product.reviewsCount = allReviews.length;
    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review
    });

  } catch (error) {
    next(error);
  }
};

exports.getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.findAll({
      where: { productId },
      include: [{
        model: User,
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });

  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.userId !== userId && userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    const productId = review.productId;
    await review.destroy();

    // Recalculate product rating
    const product = await Product.findByPk(productId);
    if (product) {
      const remainingReviews = await Review.findAll({ where: { productId } });
      if (remainingReviews.length > 0) {
        const totalRating = remainingReviews.reduce((sum, r) => sum + r.rating, 0);
        product.rating = (totalRating / remainingReviews.length).toFixed(1);
        product.reviewCount = remainingReviews.length;
        product.reviewsCount = remainingReviews.length;
      } else {
        product.rating = 0;
        product.reviewCount = 0;
        product.reviewsCount = 0;
      }
      await product.save();
    }

    return res.status(200).json({ success: true, message: 'Review deleted successfully' });

  } catch (error) {
    next(error);
  }
};
