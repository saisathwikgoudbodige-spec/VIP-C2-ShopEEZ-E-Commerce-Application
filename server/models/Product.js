import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, default: 0 },
  discountPrice: { type: Number, default: 0 },
  category: { type: String, required: true },
  brand: { type: String, default: '' },
  stock: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  seller: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  tags: { type: [String], default: [] }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
