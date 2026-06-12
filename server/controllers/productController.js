import Product from '../models/Product.js';
import Review from '../models/Review.js';

// @desc    Get all products with query filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.search
      ? {
        name: {
          $regex: req.query.search,
          $options: 'i'
        }
      }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    let priceFilter = {};
    if (req.query.minPrice || req.query.maxPrice) {
      priceFilter.price = {};
      if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
    }

    let ratingFilter = {};
    if (req.query.rating) {
      ratingFilter.ratings = { $gte: Number(req.query.rating) };
    }

    const queryFilter = { ...keyword, ...category, ...priceFilter, ...ratingFilter };

    let sortOption = {};
    if (req.query.sort === 'priceAsc') {
      sortOption = { price: 1 };
    } else if (req.query.sort === 'priceDesc') {
      sortOption = { price: -1 };
    } else if (req.query.sort === 'rating') {
      sortOption = { ratings: -1 };
    } else {
      sortOption = { createdAt: -1 }; // newest
    }

    const count = await Product.countDocuments(queryFilter);
    const products = await Product.find(queryFilter)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      success: true,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const reviews = await Review.find({ product: req.params.id }).populate('user', 'name avatar');
      res.json({
        success: true,
        product,
        reviews
      });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product review
// @route   POST /api/products/:id/review
// @access  Private
export const createProductReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = await Review.findOne({
        user: req.user._id,
        product: req.params.id
      });

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed by this user');
      }

      const review = await Review.create({
        user: req.user._id,
        product: req.params.id,
        rating: Number(rating),
        comment
      });

      const reviews = await Review.find({ product: req.params.id });
      product.numReviews = reviews.length;
      product.ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

      await product.save();
      res.status(201).json({ success: true, message: 'Review added successfully', review });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all unique categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};
