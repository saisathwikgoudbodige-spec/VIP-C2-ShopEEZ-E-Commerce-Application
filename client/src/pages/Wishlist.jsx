import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addItemToCart } from '../redux/slices/cartSlice';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const handleRemove = (id, name) => {
    dispatch(removeFromWishlist(id));
    toast.info(`${name} removed from wishlist`);
  };

  const handleMoveToCart = (product) => {
    if (!userInfo) {
      toast.warn('Please login to add items to cart');
      return;
    }
    dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
    dispatch(removeFromWishlist(product._id));
    toast.success(`${product.name} moved to cart`);
  };

  return (
    <div className="wishlist-page">
      <h2 className="page-title">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty glass-card">
          <FaHeart className="empty-wishlist-icon" />
          <h2>Your Wishlist is Empty</h2>
          <p>Add products you love to save them for later checkout.</p>
          <Link to="/products" className="btn btn-primary">Browse Catalog</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => {
            const hasDiscount = product.discountPrice && product.discountPrice < product.price;
            const displayPrice = hasDiscount ? product.discountPrice : product.price;
            return (
              <div key={product._id} className="wishlist-item-card glass-card">
                <div className="item-image-container">
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600'}
                    alt={product.name}
                  />
                  <button className="remove-item-btn" onClick={() => handleRemove(product._id, product.name)}>
                    <FaTrash />
                  </button>
                </div>
                <div className="item-info">
                  <span className="item-brand">{product.brand || 'ShopEZ'}</span>
                  <Link to={`/product/${product._id}`}>
                    <h4 className="item-name">{product.name}</h4>
                  </Link>
                  <span className="item-price">{formatPrice(displayPrice)}</span>

                  {product.stock > 0 ? (
                    <button className="btn btn-primary btn-move-cart" onClick={() => handleMoveToCart(product)}>
                      <FaShoppingCart /> Move to Cart
                    </button>
                  ) : (
                    <span className="out-of-stock-txt">Out of Stock</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
