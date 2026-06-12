import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaChevronDown, FaStore } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const cartCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = wishlistItems.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchWord.trim()) {
      navigate(`/products?search=${searchWord.trim()}`);
    } else {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          <FaStore className="logo-icon" />
          <span>Shop<span className="logo-accent">EZ</span></span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Action Links */}
        <div className="navbar-links">
          <Link to="/products" className="navbar-link">Shop</Link>
          
          {/* Wishlist */}
          <Link to="/wishlist" className="navbar-icon-link">
            <div className="icon-badge-container">
              <FaHeart className="nav-icon wishlist-icon" />
              {wishlistCount > 0 && <span className="badge-count bg-pink">{wishlistCount}</span>}
            </div>
            <span className="nav-label">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="navbar-icon-link">
            <div className="icon-badge-container">
              <FaShoppingCart className="nav-icon cart-icon" />
              {cartCount > 0 && <span className="badge-count bg-indigo">{cartCount}</span>}
            </div>
            <span className="nav-label">Cart</span>
          </Link>

          {/* Profile Dropdown */}
          {userInfo ? (
            <div className="profile-dropdown-container">
              <button 
                className="profile-dropdown-btn" 
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              >
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt={userInfo.name} className="nav-avatar" />
                ) : (
                  <FaUser className="nav-avatar-fallback" />
                )}
                <span className="nav-user-name">{userInfo.name.split(' ')[0]}</span>
                <FaChevronDown className={`arrow-icon ${showDropdown ? 'rotate' : ''}`} />
              </button>

              {showDropdown && (
                <div className="profile-dropdown">
                  <Link to="/profile" className="dropdown-item">My Profile</Link>
                  <Link to="/orders" className="dropdown-item">My Orders</Link>
                  {userInfo.role === 'admin' && (
                    <>
                      <div className="dropdown-divider"></div>
                      <Link to="/admin/dashboard" className="dropdown-item admin-item">Admin Dashboard</Link>
                    </>
                  )}
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary nav-login-btn">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
