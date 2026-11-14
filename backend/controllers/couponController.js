const { Op } = require('sequelize');
const { Coupon, CouponUsage } = require('../models');

exports.validateCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal } = req.body;
    const userId = req.user.id;

    if (!code || !cartTotal) {
      return res.status(400).json({ valid: false, message: 'Coupon code and cart total are required' });
    }

    const couponCode = code.toUpperCase();
    const coupon = await Coupon.findOne({ where: { code: couponCode } });

    if (!coupon) {
      return res.status(404).json({ valid: false, message: 'Invalid coupon code' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ valid: false, message: 'Coupon is not active' });
    }

    const now = new Date();
    if (coupon.validFrom && now < coupon.validFrom) {
      return res.status(400).json({ valid: false, message: 'Coupon is not yet valid' });
    }
    if (coupon.validTill && now > coupon.validTill) {
      return res.status(400).json({ valid: false, message: 'Coupon has expired' });
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ valid: false, message: 'Coupon usage limit reached' });
    }

    if (parseFloat(cartTotal) < parseFloat(coupon.minOrderAmount)) {
      return res.status(400).json({ valid: false, message: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}` });
    }

    const previousUsage = await CouponUsage.findOne({ where: { userId, couponId: coupon.id } });
    if (previousUsage) {
      return res.status(400).json({ valid: false, message: 'You have already used this coupon' });
    }

    let discount = 0;
    if (coupon.discountType === 'fixed') {
      discount = parseFloat(coupon.discountValue);
    } else if (coupon.discountType === 'percentage') {
      discount = (parseFloat(cartTotal) * parseFloat(coupon.discountValue)) / 100;
      if (coupon.maxDiscount !== null) {
        const maxDisc = parseFloat(coupon.maxDiscount);
        if (discount > maxDisc) {
          discount = maxDisc;
        }
      }
    }

    // Ensure discount isn't more than cart total
    if (discount > parseFloat(cartTotal)) {
      discount = parseFloat(cartTotal);
    }

    return res.status(200).json({
      valid: true,
      discount: parseFloat(discount.toFixed(2)),
      couponCode: coupon.code,
      message: 'Coupon applied successfully'
    });

  } catch (error) {
    next(error);
  }
};

exports.getAvailableCoupons = async (req, res, next) => {
  try {
    const now = new Date();
    const coupons = await Coupon.findAll({
      where: {
        isActive: true,
        [Op.or]: [
          { validTill: { [Op.gte]: now } },
          { validTill: null }
        ]
      },
      attributes: ['code', 'discountType', 'discountValue', 'maxDiscount', 'minOrderAmount', 'validTill', 'applicableCategories', 'applicableBrands']
    });

    return res.status(200).json(coupons);
  } catch (error) {
    next(error);
  }
};
