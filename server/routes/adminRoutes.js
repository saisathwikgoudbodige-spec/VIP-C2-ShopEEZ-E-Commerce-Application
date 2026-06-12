import express from 'express';
import {
  getAdminProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus,
  getAdminUsers,
  deleteUser,
  getDashboardStats
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);

router.get('/products', getAdminProducts);
router.post('/products', upload.array('images', 5), addProduct);
router.put('/products/:id', upload.array('images', 5), updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', updateOrderStatus);

router.get('/users', getAdminUsers);
router.delete('/users/:id', deleteUser);

export default router;
