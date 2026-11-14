const sequelize = require('../config/database');
const { Coupon } = require('../models');

const seedCoupons = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected for seeding coupons.');
    
    await Coupon.sync(); // Ensure table exists

    const now = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);
    
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);

    const coupons = [
      {
        code: 'AROMA500',
        discountType: 'fixed',
        discountValue: 500,
        minOrderAmount: 5000,
        validFrom: now,
        validTill: oneYearFromNow,
      },
      {
        code: 'FIRST10',
        discountType: 'percentage',
        discountValue: 10,
        maxDiscount: 2000,
        minOrderAmount: 3000,
        validFrom: now,
        validTill: oneYearFromNow,
      },
      {
        code: 'MOBILE15',
        discountType: 'percentage',
        discountValue: 15,
        maxDiscount: 3000,
        applicableCategories: ['Mobile'],
        validFrom: now,
        validTill: oneYearFromNow,
      },
      {
        code: 'SUMMER20',
        discountType: 'percentage',
        discountValue: 20,
        maxDiscount: 5000,
        applicableCategories: ['AC', 'Cooler'],
        validFrom: now,
        validTill: sixMonthsFromNow,
      },
      {
        code: 'FREEDELIVERY',
        discountType: 'fixed',
        discountValue: 0,
        minOrderAmount: 1000,
        validFrom: now,
        validTill: oneYearFromNow,
      }
    ];

    await Coupon.bulkCreate(coupons, { ignoreDuplicates: true });
    console.log('Coupons seeded successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding coupons:', error);
    process.exit(1);
  }
};

seedCoupons();
