import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, addProductReview, fetchProducts, clearProductError } from '../redux/slices/productSlice';
import { addItemToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import ReviewCard from '../components/ReviewCard';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetail, reviews, loading, error, success, products: allProducts } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const isWishlisted = productDetail && wishlistItems.some((item) => item._id === productDetail._id);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail) {
      setActiveImage(productDetail.images[0] || '');
      dispatch(fetchProducts({ category: productDetail.category, page: 1 }));
    }
  }, [productDetail, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Review submitted successfully!');
      setComment('');
      setRating(5);
      dispatch(fetchProductDetail(id));
      dispatch(clearProductError());
    }
  }, [success, dispatch, id]);

  const handleQtyChange = (val) => {
    if (val < 1) return;
    if (productDetail && val > productDetail.stock) {
      toast.error(`Only ${productDetail.stock} units in stock!`);
      return;
    }
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (!userInfo) {
      toast.warn('Please login to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addItemToCart({ productId: productDetail._id, quantity }));
    toast.success(`${productDetail.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!userInfo) {
      toast.warn('Please login to checkout');
      navigate('/login');
      return;
    }
    dispatch(addItemToCart({ productId: productDetail._id, quantity }));
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productDetail._id));
      toast.info('Removed from wishlist');
    } else {
      dispatch(addToWishlist(productDetail));
      toast.success('Added to wishlist');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please add a comment');
      return;
    }
    dispatch(addProductReview({ id, rating, comment }));
  };

  if (loading && !productDetail) return <Loader />;
  if (error && !productDetail) return <Alert variant="danger">{error}</Alert>;
  if (!productDetail) return <Alert variant="danger">Product not found</Alert>;

  const hasDiscount = productDetail.discountPrice && productDetail.discountPrice < productDetail.price;
  const discountPercent = hasDiscount
    ? Math.round(((productDetail.price - productDetail.discountPrice) / productDetail.price) * 100)
    : 0;

  const relatedProducts = allProducts
    ? allProducts.filter((p) => p._id !== productDetail._id).slice(0, 4)
    : [];

  return (
    <div className="product-detail-page">
      <div className="product-essential glass-card">
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={activeImage || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600'} alt={productDetail.name} />
            {hasDiscount && <span className="discount-badge">-{discountPercent}%</span>}
          </div>
          <div className="thumbnail-list">
            {productDetail.images.map((img, idx) => (
              <button
                key={idx}
                className={`thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`thumbnail-${idx}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info-panel">
          <div className="info-header">
            <span className="brand-name">{productDetail.brand || 'ShopEZ'}</span>
            <button className="detail-wishlist-btn" onClick={handleWishlistToggle}>
              {isWishlisted ? <FaHeart className="heart-filled" /> : <FaRegHeart className="heart-empty" />}
            </button>
          </div>
          <h1 className="product-title">{productDetail.name}</h1>

          <div className="rating-summary">
            {productDetail.numReviews > 0 ? (
              <>
                <div className="stars">
                  {productDetail.ratings.toFixed(1)} <FaStar className="star-filled" style={{ fontSize: '9px', marginLeft: '2px' }} />
                </div>
                <span className="rating-count">({productDetail.numReviews} customer reviews)</span>
              </>
            ) : (
              <span className="rating-count">No reviews yet</span>
            )}
          </div>

          <div className="product-price-section">
            {hasDiscount ? (
              <div className="price-row">
                <span className="discount-price">{formatPrice(productDetail.discountPrice)}</span>
                <span className="original-price">{formatPrice(productDetail.price)}</span>
              </div>
            ) : (
              <span className="discount-price">{formatPrice(productDetail.price)}</span>
            )}
            <span className={`stock-status ${productDetail.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {productDetail.stock > 0 ? `In Stock (${productDetail.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          <p className="short-desc">{productDetail.description.slice(0, 180)}...</p>

          {productDetail.stock > 0 && (
            <div className="purchase-controls">
              <div className="qty-selector">
                <button onClick={() => handleQtyChange(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQtyChange(quantity + 1)}>+</button>
              </div>

              <div className="action-buttons">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="btn btn-accent" onClick={handleBuyNow}>
                  <FaCreditCard /> Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="product-tabs glass-card">
        <div className="tabs-header">
          <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button>
          <button className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Specifications</button>
        </div>
        <div className="tab-content">
          {activeTab === 'description' ? (
            <div className="tab-pane-content">
              <p>{productDetail.description}</p>
            </div>
          ) : (
            <div className="tab-pane-content">
              <table className="specs-table">
                <tbody>
                  <tr><td>Brand</td><td>{productDetail.brand || 'Generic'}</td></tr>
                  <tr><td>Category</td><td>{productDetail.category}</td></tr>
                  <tr><td>Seller</td><td>{productDetail.seller || 'ShopEZ Store'}</td></tr>
                  <tr><td>Tags</td><td>{productDetail.tags.join(', ')}</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-container">
          <div className="reviews-list">
            <h3>Verified Purchases ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((rev) => <ReviewCard key={rev._id} review={rev} />)
            )}
          </div>

          <div className="write-review-container glass-card">
            <h3>Write a Review</h3>
            {userInfo ? (
              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="form-control"
                  >
                    <option value={5}>5 ★ - Excellent</option>
                    <option value={4}>4 ★ - Good</option>
                    <option value={3}>3 ★ - Average</option>
                    <option value={2}>2 ★ - Bad</option>
                    <option value={1}>1 ★ - Terrible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Comment</label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    className="form-control"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </form>
            ) : (
              <div className="login-prompt">
                <p>You must be logged in to write a product review.</p>
                <Link to="/login" className="btn btn-secondary">Login Now</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-section">
          <h2 className="section-title">Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
