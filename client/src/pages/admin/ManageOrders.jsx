import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatPrice } from '../../utils/helpers';
import { toast } from 'react-toastify';
import './AdminPages.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/admin/orders');
      setOrders(data.orders);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  const getStatusClass = (status) => {
    return { delivered: 'badge-success', shipped: 'badge-info', cancelled: 'badge-danger', processing: 'badge-warning' }[status] || 'badge-warning';
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Manage Orders</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{orders.length} total orders</span>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>#{order._id.slice(-8).toUpperCase()}</td>
                <td>{order.user?.name || 'N/A'}<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.user?.email}</span></td>
                <td>{order.items.length} item(s)</td>
                <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatPrice(order.totalAmount)}</td>
                <td><span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>{order.paymentStatus}</span></td>
                <td>{formatDate(order.createdAt)}</td>
                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="form-control status-select"
                    disabled={order.orderStatus === 'cancelled'}
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
