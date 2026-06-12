import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaShoppingBag, FaHeart, FaUser, FaSearch, FaChevronDown, FaBolt } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchWord, setSearchWord] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { userInfo } = useSelector((s) => s.auth);
  const { cart } = useSelector((s) => s.cart);
  const { wishlistItems } = useSelector((s) => s.wishlist);

  const cartCount = cart?.items ? cart.items.reduce((a, i) => a + i.quantity, 0) : 0;
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(searchWord.trim() ? `/products?search=${searchWord.trim()}` : '/products');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/products?category=Electronics', label: 'Electronics' },
    { to: '/products?category=Fashion', label: 'Fashion' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <FaBolt className="logo-bolt" />
          <span>Shop<span className="logo-accent">EZZ</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar-nav-links">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products…"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </form>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Wishlist */}
          <Link to="/wishlist" className="action-btn" aria-label="Wishlist">
            <FaHeart />
            {wishlistCount > 0 && <span className="action-count">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="action-btn cart-btn" aria-label="Cart">
            <FaShoppingBag />
            {cartCount > 0 && <span className="action-count cart-count">{cartCount}</span>}
          </Link>

          {/* User */}
          {userInfo ? (
            <div className="dropdown-wrapper">
              <button
                className="user-btn"
                onClick={() => setShowDropdown((v) => !v)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 160)}
              >
                {userInfo.avatar ? (
                  <img src={userInfo.avatar} alt={userInfo.name} className="user-avatar" />
                ) : (
                  <span className="user-avatar-init">{userInfo.name[0]}</span>
                )}
                <span className="user-name">{userInfo.name.split(' ')[0]}</span>
                <FaChevronDown className={`chevron ${showDropdown ? 'open' : ''}`} />
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span>{userInfo.name}</span>
                    <small>{userInfo.email}</small>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item">My Profile</Link>
                  <Link to="/orders" className="dropdown-item">My Orders</Link>
                  {userInfo.role === 'admin' && (
                    <>
                      <div className="dropdown-divider" />
                      <Link to="/admin/dashboard" className="dropdown-item admin-item">⚡ Admin Panel</Link>
                    </>
                  )}
                  <div className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout-item">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary login-btn">
              <FaUser /> Login
            </Link>
          )}

          {/* Mobile Toggle */}
          <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <form className="mobile-search" onSubmit={handleSearch}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search products…"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </form>
        {navLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="mobile-link">{label}</Link>
        ))}
        {!userInfo && (
          <Link to="/login" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Login / Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
