import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaHistory } from 'react-icons/fa';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="order-success-page glass-card">
      <FaCheckCircle className="success-icon" />
      <span className="success-tag">THANK YOU FOR YOUR PURCHASE</span>
      <h1>Order Placed Successfully!</h1>
      <p className="order-desc">Your payment was processed and your order is now being prepared for shipping.</p>

      {orderId && (
        <div className="order-id-box">
          <span>Order Reference ID</span>
          <strong>{orderId}</strong>
        </div>
      )}

      <div className="action-buttons">
        <Link to="/orders" className="btn btn-primary">
          <FaHistory /> Track Order History
        </Link>
        <Link to="/products" className="btn btn-secondary">
          <FaShoppingBag /> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
