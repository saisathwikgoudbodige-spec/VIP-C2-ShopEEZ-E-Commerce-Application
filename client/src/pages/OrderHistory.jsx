import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { formatPrice } from '../utils/helpers';
import { FaChevronDown, FaChevronUp, FaBoxOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get('/orders/my-orders');
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message || 'Failed to fetch order history');
      }
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const { data } = await axiosInstance.put(`/orders/${orderId}/cancel`);
        if (data.success) {
          toast.success('Order cancelled successfully');
          fetchOrders();
        } else {
          toast.error(data.message || 'Failed to cancel order');
        }
      } catch (err) {
        toast.error(err.response && err.response.data.message ? err.response.data.message : err.message);
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return <span className="badge badge-success">Delivered</span>;
      case 'shipped':
        return <span className="badge badge-info">Shipped</span>;
      case 'cancelled':
        return <span className="badge badge-danger">Cancelled</span>;
      case 'processing':
      default:
        return <span className="badge badge-warning">Processing</span>;
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="order-history-page">
      <h2 className="page-title">My Orders</h2>

      {orders.length === 0 ? (
        <div className="history-empty glass-card">
          <FaBoxOpen className="empty-history-icon" />
          <h2>No Orders Found</h2>
          <p>You haven't placed any orders yet. Visit our shop to find premium products.</p>
        </div>
      ) : (
        <div className="orders-list-container">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order._id;
            return (
              <div key={order._id} className="order-card-group glass-card">
                <div className="order-main-row" onClick={() => toggleExpand(order._id)}>
                  <div className="order-summary-meta">
                    <div className="meta-col">
                      <span>Order Reference</span>
                      <strong>#{order._id.slice(-8).toUpperCase()}</strong>
                    </div>
                    <div className="meta-col">
                      <span>Placed On</span>
                      <strong>{formatDate(order.createdAt)}</strong>
                    </div>
                    <div className="meta-col">
                      <span>Total Amount</span>
                      <strong className="order-meta-total">{formatPrice(order.totalAmount)}</strong>
                    </div>
                    <div className="meta-col">
                      <span>Order Status</span>
                      <div>{getStatusBadge(order.orderStatus)}</div>
                    </div>
                  </div>

                  <div className="expand-trigger-icon">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="order-expanded-details">
                    <div className="details-divider"></div>
                    <div className="expanded-grid">
                      <div className="expanded-products">
                        <h4>Items Purchased</h4>
                        <div className="products-list">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="ordered-product-row">
                              <img src={item.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=200'} alt={item.name} />
                              <div className="ordered-product-info">
                                <h5>{item.name}</h5>
                                <span>{item.quantity} &times; {formatPrice(item.price)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="expanded-meta-info">
                        <div className="meta-block">
                          <h4>Delivery Address</h4>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>

                        <div className="meta-block">
                          <h4>Payment Details</h4>
                          <p>Method: <strong>{order.paymentMethod}</strong></p>
                          <p>Status: <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>{order.paymentStatus}</span></p>
                        </div>

                        {order.orderStatus === 'processing' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order._id);
                            }}
                            className="btn btn-danger btn-cancel-order"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
