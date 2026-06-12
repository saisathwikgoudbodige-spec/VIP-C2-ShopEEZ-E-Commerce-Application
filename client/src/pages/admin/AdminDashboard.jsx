import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatPrice } from '../../utils/helpers';
import {
  FaBox, FaShoppingCart, FaUsers, FaDollarSign,
  FaExclamationTriangle, FaArrowRight
} from 'react-icons/fa';
import './AdminDashboard.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card glass-card" style={{ '--stat-color': color }}>
    <div className="stat-icon-wrapper">{icon}</div>
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      <h3 className="stat-value">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [lowStock, setLowStock] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await axiosInstance.get('/admin/dashboard');
        setStats(data.stats);
        setLowStock(data.lowStockAlerts);
        setRecentOrders(data.recentOrders);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      delivered: 'badge-success',
      shipped: 'badge-info',
      cancelled: 'badge-danger',
      processing: 'badge-warning'
    };
    return <span className={`badge ${map[status] || 'badge-warning'}`}>{status}</span>;
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Welcome back! Here's an overview of your store.</p>
        </div>
        <Link to="/admin/products/add" className="btn btn-primary">+ Add Product</Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard icon={<FaBox />} label="Total Products" value={stats.totalProducts} color="#6366f1" />
        <StatCard icon={<FaShoppingCart />} label="Total Orders" value={stats.totalOrders} color="#ec4899" />
        <StatCard icon={<FaUsers />} label="Total Users" value={stats.totalUsers} color="#10b981" />
        <StatCard icon={<FaDollarSign />} label="Total Revenue" value={formatPrice(stats.revenue)} color="#f59e0b" />
      </div>

      <div className="dashboard-grid">
        {/* Recent Orders */}
        <div className="glass-card dashboard-card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <Link to="/admin/orders" className="view-all-link">View All <FaArrowRight /></Link>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>#{order._id.slice(-8).toUpperCase()}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700 }}>{formatPrice(order.totalAmount)}</td>
                    <td>{getStatusBadge(order.orderStatus)}</td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="glass-card dashboard-card">
          <div className="card-header">
            <h3><FaExclamationTriangle style={{ color: 'var(--warning)' }} /> Low Stock</h3>
            <Link to="/admin/products" className="view-all-link">Manage <FaArrowRight /></Link>
          </div>
          {lowStock.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', padding: '1rem' }}>No low stock items.</p>
          ) : (
            lowStock.map((product) => (
              <div key={product._id} className="low-stock-row">
                <img
                  src={product.images[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=200'}
                  alt={product.name}
                  className="low-stock-img"
                />
                <div className="low-stock-info">
                  <h5>{product.name}</h5>
                  <span>{product.category}</span>
                </div>
                <span className="badge badge-danger">{product.stock} left</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
