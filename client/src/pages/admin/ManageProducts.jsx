import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { formatPrice } from '../../utils/helpers';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './AdminPages.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/admin/products?pageNumber=${pageNum}`);
      setProducts(data.products);
      setPages(data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(page); }, [page]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      try {
        await axiosInstance.delete(`/admin/products/${id}`);
        toast.success(`${name} deleted successfully`);
        fetchProducts(page);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && products.length === 0) return <Loader />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Manage Products</h2>
        <Link to="/admin/products/add" className="btn btn-primary">
          <FaPlus /> Add New Product
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="admin-search-bar glass-card">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images[0] || ''}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', background: 'var(--bg-tertiary)' }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{product.brand}</div>
                </td>
                <td><span className="badge badge-info">{product.category}</span></td>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(product.discountPrice || product.price)}</div>
                  {product.discountPrice > 0 && (
                    <div style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>{formatPrice(product.price)}</div>
                  )}
                </td>
                <td>
                  <span className={`badge ${product.stock > 5 ? 'badge-success' : product.stock > 0 ? 'badge-warning' : 'badge-danger'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <span className={`badge ${product.isFeatured ? 'badge-success' : 'badge-info'}`}>
                    {product.isFeatured ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/admin/products/edit/${product._id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(product._id, product.name)} className="btn btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No products found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="pagination">
          {[...Array(pages).keys()].map(n => (
            <button key={n+1} onClick={() => setPage(n+1)} className={`btn page-btn ${page === n+1 ? 'btn-primary' : 'btn-secondary'}`}>{n+1}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
