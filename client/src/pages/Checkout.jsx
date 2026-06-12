import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../redux/slices/cartSlice';
import axiosInstance from '../api/axiosInstance';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userInfo) {
      const address = userInfo.address || {};
      setStreet(address.street || '');
      setCity(address.city || '');
      setState(address.state || '');
      setPincode(address.pincode || '');
      setCountry(address.country || '');
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCart());
    }
  }, [dispatch, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!street || !city || !state || !pincode || !country) {
      toast.error('Please fill in all shipping fields');
      return;
    }

    if (!cart.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    const shippingAddress = { street, city, state, pincode, country };
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0] || '',
      quantity: item.quantity,
      price: item.price
    }));

    const subtotal = cart.totalPrice;
    const deliveryCharge = subtotal > 100 ? 0 : 9.99;
    const totalAmount = subtotal + deliveryCharge;

    try {
      const { data } = await axiosInstance.post('/orders', {
        items: orderItems,
        shippingAddress,
        paymentMethod,
        totalAmount
      });

      if (data.success) {
        toast.success('Order placed successfully!');
        navigate(`/order-success?orderId=${data.order._id}`);
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) return <Loader />;
  if (cartError) return <Alert variant="danger">{cartError}</Alert>;

  const subtotal = cart.totalPrice || 0;
  const deliveryCharge = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <div className="checkout-page">
      <h2 className="page-title">Secure Checkout</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <form onSubmit={handleSubmit} className="checkout-layout">
        <div className="checkout-form-section glass-card">
          <h3>Shipping Address</h3>
          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              className="form-control"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="123 Main St, Apt 4"
              required
            />
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Gotham"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">State / Province</label>
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="NJ"
                required
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Pincode / Postal Code</label>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="07001"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="USA"
                required
              />
            </div>
          </div>

          <div className="payment-method-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option-card">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                />
                <div className="payment-option-info">
                  <h4>Cash on Delivery (COD)</h4>
                  <p>Pay with cash upon delivery of your items.</p>
                </div>
              </label>

              <label className="payment-option-card">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Online'}
                  onChange={() => setPaymentMethod('Online')}
                />
                <div className="payment-option-info">
                  <h4>Online Credit/Debit Card</h4>
                  <p>Fast, secure online checkout simulation.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="checkout-summary-section glass-card">
          <h3>Order Review</h3>
          <div className="checkout-items-list">
            {cart.items && cart.items.map((item) => (
              <div key={item.product._id} className="checkout-item-row">
                <img src={item.product.images[0] || ''} alt={item.product.name} />
                <div className="checkout-item-info">
                  <h4>{item.product.name}</h4>
                  <span>Qty: {item.quantity} &times; {formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Grand Total</span>
            <span className="grand-total-val">{formatPrice(grandTotal)}</span>
          </div>

          <button type="submit" disabled={loading} className="btn btn-accent btn-place-order">
            {loading ? 'Processing Order...' : 'Place Secure Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
