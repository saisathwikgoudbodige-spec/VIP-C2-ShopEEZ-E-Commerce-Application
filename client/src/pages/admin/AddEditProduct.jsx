import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { toast } from 'react-toastify';
import './AdminPages.css';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [seller, setSeller] = useState('');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrls, setImageUrls] = useState('');

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Other'];

  useEffect(() => {
    if (isEditing) {
      axiosInstance.get(`/admin/products`).then(({ data }) => {
        const found = data.products.find(p => p._id === id);
        if (found) {
          setName(found.name);
          setDescription(found.description);
          setPrice(found.price);
          setDiscountPrice(found.discountPrice || '');
          setCategory(found.category);
          setBrand(found.brand || '');
          setStock(found.stock);
          setSeller(found.seller || '');
          setTags(found.tags.join(', '));
          setIsFeatured(found.isFeatured);
          setImageUrls(found.images.join('\n'));
        }
        setLoading(false);
      }).catch(() => { setLoading(false); });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !stock) {
      toast.error('Please fill required fields: Name, Price, Category, Stock');
      return;
    }
    setSaving(true);
    setError(null);

    const images = imageUrls.split('\n').map(s => s.trim()).filter(Boolean);
    const payload = { name, description, price, discountPrice, category, brand, stock, seller, tags, isFeatured, images };

    try {
      if (isEditing) {
        await axiosInstance.put(`/admin/products/${id}`, payload);
        toast.success('Product updated successfully!');
      } else {
        await axiosInstance.post('/admin/products', payload);
        toast.success('Product created successfully!');
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-page">
      <h2 className="admin-page-title">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <form onSubmit={handleSubmit} className="admin-form glass-card">
        <div className="form-row-grid">
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Brand</label>
            <input type="text" className="form-control" value={brand} onChange={e => setBrand(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea rows={4} className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="form-row-grid">
          <div className="form-group">
            <label className="form-label">Price ($) *</label>
            <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} min="0" step="0.01" required />
          </div>
          <div className="form-group">
            <label className="form-label">Discount Price ($)</label>
            <input type="number" className="form-control" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} min="0" step="0.01" />
          </div>
        </div>

        <div className="form-row-grid">
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select className="form-control" value={category} onChange={e => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Stock *</label>
            <input type="number" className="form-control" value={stock} onChange={e => setStock(e.target.value)} min="0" required />
          </div>
        </div>

        <div className="form-row-grid">
          <div className="form-group">
            <label className="form-label">Seller</label>
            <input type="text" className="form-control" value={seller} onChange={e => setSeller(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Tags (comma-separated)</label>
            <input type="text" className="form-control" value={tags} onChange={e => setTags(e.target.value)} placeholder="electronics, wireless, audio" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image URLs (one per line)</label>
          <textarea rows={3} className="form-control" value={imageUrls} onChange={e => setImageUrls(e.target.value)} placeholder="https://..." />
        </div>

        <div className="form-group featured-toggle">
          <label className="toggle-label">
            <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
            <span>Mark as Featured Product</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/products')} className="btn btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProduct;
