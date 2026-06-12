import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaChevronDown } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { userInfo } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);
  const { wishlistItems } = useSelector((s) => s.wishlist);

  const cartCount = cart?.items ? cart.items.reduce((a, i) => a + i.quantity, 0) : 0;
  const wishlistCount = wishlistItems.length;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/products?search=${search.trim()}` : '/products');
    setMobileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate('/login');
  };

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports'];

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top">
        <div className="header-top-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-shop">Shop</span><span className="logo-ez">EZZ</span>
          </Link>

          {/* Search */}
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
          </form>

          {/* Right icons */}
          <div className="header-actions">
            {/* User */}
            {userInfo ? (
              <div className="dropdown-wrap">
                <button
                  className="header-action-btn"
                  onClick={() => setShowDropdown((v) => !v)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                >
                  <FaUser className="action-icon" />
                  <div className="action-label">
                    <span className="action-sub">Hello, {userInfo.name.split(' ')[0]}</span>
                    <span className="action-main">Account <FaChevronDown style={{ fontSize: 10 }} /></span>
                  </div>
                </button>
                {showDropdown && (
                  <div className="dropdown">
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <Link to="/orders" className="dropdown-item">My Orders</Link>
                    {userInfo.role === 'admin' && (
                      <Link to="/admin/dashboard" className="dropdown-item dropdown-admin">Admin Panel</Link>
                    )}
                    <hr className="dropdown-hr" />
                    <button className="dropdown-item dropdown-logout" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="dropdown-wrap">
                <Link to="/login" className="header-action-btn">
                  <FaUser className="action-icon" />
                  <div className="action-label">
                    <span className="action-sub">Sign In</span>
                    <span className="action-main">Account</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="header-action-btn">
              <div className="icon-wrap">
                <FaHeart className="action-icon" />
                {wishlistCount > 0 && <span className="badge-dot">{wishlistCount}</span>}
              </div>
              <div className="action-label">
                <span className="action-sub">Saved</span>
                <span className="action-main">Wishlist</span>
              </div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="header-action-btn cart-action">
              <div className="icon-wrap">
                <FaShoppingCart className="action-icon" />
                {cartCount > 0 && <span className="badge-dot cart-dot">{cartCount}</span>}
              </div>
              <span className="cart-label">Cart</span>
            </Link>
          </div>

          <button className="mobile-toggle" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="category-nav">
        <div className="category-nav-inner">
          <Link to="/products" className="cat-nav-link all-link">All Categories</Link>
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`} className="cat-nav-link">
              {cat}
            </Link>
          ))}
          <Link to="/products?discount=true" className="cat-nav-link deal-link">Today's Deals</Link>
        </div>
      </nav>

      {/* Mobile search */}
      {mobileOpen && (
        <div className="mobile-search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <button type="submit"><FaSearch /></button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
