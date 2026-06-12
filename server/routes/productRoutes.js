import express from 'express';
import {
  getProducts,
  getProductById,
  createProductReview,
  getFeaturedProducts,
  getCategories
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/:id/review', protect, createProductReview);

export default router;
