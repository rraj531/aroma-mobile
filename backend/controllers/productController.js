const { Product, sequelize } = require('../models');
const { Op } = require('sequelize');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
  try {
    const { 
      category, 
      brand, 
      minPrice, 
      maxPrice, 
      rating, 
      inStock, 
      search, 
      sort,
      page = 1,
      limit = 12
    } = req.query;

    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }
    
    if (brand) {
      const brandArray = brand.split(',').map(b => b.trim());
      whereClause.brand = { [Op.in]: brandArray };
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    if (rating) {
      whereClause.rating = { [Op.gte]: rating };
    }

    if (inStock === 'true') {
      whereClause.stock = true;
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { brand: { [Op.like]: `%${search}%` } }
      ];
    }

    let orderClause = [['createdAt', 'DESC']]; // default newest
    if (sort) {
      if (sort === 'price_asc') orderClause = [['price', 'ASC']];
      if (sort === 'price_desc') orderClause = [['price', 'DESC']];
      if (sort === 'rating') orderClause = [['rating', 'DESC']];
      if (sort === 'newest') orderClause = [['createdAt', 'DESC']];
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      order: orderClause,
      limit: Number(limit),
      offset: offset,
    });

    res.json({
      products: rows,
      totalProducts: count,
      currentPage: Number(page),
      totalPages: Math.ceil(count / Number(limit)),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res, next) => {
  try {
    const rawCategory = req.params.category || '';
    const catMap = {
      smartphones: 'Mobile',
      smartphone: 'Mobile',
      mobiles: 'Mobile',
      mobile: 'Mobile',
      tv: 'TV',
      tvs: 'TV',
      television: 'TV',
      laptops: 'Laptop',
      laptop: 'Laptop',
      refrigerator: 'Refrigerator',
      refrigerators: 'Refrigerator',
      fridge: 'Refrigerator',
      ac: 'AC',
      airconditioner: 'AC',
      washingmachine: 'Washing Machine',
      washingmachines: 'Washing Machine',
      cooler: 'Cooler',
      coolers: 'Cooler',
      speaker: 'Speaker',
      speakers: 'Speaker',
      accessories: 'Accessories'
    };
    const normalizedKey = rawCategory.toLowerCase().replace(/[-_ ]/g, '');
    const matchedCategory = catMap[normalizedKey] || rawCategory;

    const products = await Product.findAll({
      where: { category: matchedCategory },
      order: [['createdAt', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
      raw: true
    });
    res.json(categories.map(c => c.category));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getCategories,
};
