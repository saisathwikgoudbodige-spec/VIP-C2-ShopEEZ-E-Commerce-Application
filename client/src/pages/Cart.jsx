import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, clearUserCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { formatPrice } from '../utils/helpers';
import { FaTrash, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCart());
    }
  }, [dispatch, userInfo]);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearUserCart());
      toast.info('Cart cleared');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!userInfo) {
    return (
      <div className="cart-page-empty glass-card">
        <FaShoppingBag className="empty-cart-icon" />
        <h2>Please Login</h2>
        <p>To view your cart, you must be logged into your account.</p>
        <Link to="/login" className="btn btn-primary">Login Now</Link>
      </div>
    );
  }

  if (loading && (!cart || !cart.items)) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const hasItems = cart && cart.items && cart.items.length > 0;

  const subtotal = cart.totalPrice;
  const deliveryCharge = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="cart-page">
      <h2 className="page-title">Shopping Cart</h2>

      {!hasItems ? (
        <div className="cart-page-empty glass-card">
          <FaShoppingBag className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Browse our store and add products to your cart!</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Items ({cart.items.length})</span>
              <button onClick={handleClearCart} className="btn-clear-cart">
                <FaTrash /> Clear Cart
              </button>
            </div>
            <div className="cart-items-list">
              {cart.items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
          </div>

          <div className="cart-summary-section glass-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Estimated Total</span>
              <span className="grand-total-val">{formatPrice(grandTotal)}</span>
            </div>
            <button className="btn btn-primary btn-checkout" onClick={handleCheckout}>
              Proceed to Checkout <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
