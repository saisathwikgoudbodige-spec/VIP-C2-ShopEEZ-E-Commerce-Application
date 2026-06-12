import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addItemToCart } from '../redux/slices/cartSlice';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
      toast.info(`${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      toast.warn('Please login to add items to cart');
      navigate('/login');
      return;
    }
    dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="product-card glass-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-card-image-container">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600'}
            alt={product.name}
            className="product-card-image"
          />
          {hasDiscount && (
            <span className="product-card-discount-badge">-{discountPercent}%</span>
          )}
          <button className="wishlist-btn" onClick={toggleWishlist}>
            {isWishlisted ? <FaHeart className="heart-filled" /> : <FaRegHeart className="heart-empty" />}
          </button>
        </div>

        <div className="product-card-info">
          <span className="product-card-brand">{product.brand || 'ShopEZ'}</span>
          <h4 className="product-card-title">{product.name}</h4>

          {product.numReviews > 0 && (
            <div className="product-card-rating">
              <div className="stars">
                {product.ratings.toFixed(1)} <FaStar className="star-filled" style={{ fontSize: '9px', marginLeft: '2px' }} />
              </div>
              <span className="num-reviews">({product.numReviews})</span>
            </div>
          )}

          <div className="product-card-footer">
            <div className="product-card-price">
              {hasDiscount ? (
                <>
                  <span className="current-price">{formatPrice(product.discountPrice)}</span>
                  <span className="original-price">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="current-price">{formatPrice(product.price)}</span>
              )}
            </div>

            {product.stock > 0 ? (
              <button className="add-to-cart-quick-btn" onClick={handleAddToCart}>
                <FaShoppingCart />
              </button>
            ) : (
              <span className="out-of-stock-label">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
