import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { FaLaptop, FaTshirt, FaUtensils, FaBook, FaRunning, FaArrowRight, FaTruck, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';
import './Home.css';

const CATEGORIES = [
  { name: 'Electronics', icon: '💻', color: '#1a73e8', bg: '#e8f0fe' },
  { name: 'Fashion',     icon: '👗', color: '#e91e63', bg: '#fce4ec' },
  { name: 'Home & Kitchen', icon: '🏠', color: '#388e3c', bg: '#e8f5e9' },
  { name: 'Books',       icon: '📚', color: '#f57c00', bg: '#fff3e0' },
  { name: 'Sports',      icon: '⚽', color: '#0288d1', bg: '#e1f5fe' },
];

const OFFERS = [
  { label: 'Min 50% Off', sub: 'Fashion', emoji: '👗', link: '/products?category=Fashion' },
  { label: 'Top Brands', sub: 'Electronics', emoji: '📱', link: '/products?category=Electronics' },
  { label: 'Best Sellers', sub: 'All Categories', emoji: '🔥', link: '/products' },
  { label: 'Grocery Deals', sub: 'Home & Kitchen', emoji: '🛒', link: '/products?category=Home+%26+Kitchen' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector((s) => s.product);
  const [seconds, setSeconds] = useState(7 * 3600 + 42 * 60);

  useEffect(() => { dispatch(fetchFeaturedProducts()); }, [dispatch]);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  return (
    <div className="home-page">

      {/* ── Hero Banner ─────────────────────── */}
      <section className="hero-banner">
        <div className="hero-main">
          <div className="hero-text">
            <p className="hero-tag">🎉 Welcome to ShopEZZ</p>
            <h1>India's Biggest Online Sale</h1>
            <p className="hero-desc">Up to 80% off on Electronics, Fashion, Home & More</p>
            <div className="hero-btns">
              <Link to="/products" className="btn btn-primary">Shop Now →</Link>
              <Link to="/register" className="btn btn-secondary">Join Free</Link>
            </div>
          </div>
          <div className="hero-image-box">
            <div className="hero-emoji-grid">
              <span>📱</span><span>👟</span>
              <span>🎧</span><span>👜</span>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="trust-strip">
          <div className="trust-item"><FaTruck /> Free Delivery on ₹499+</div>
          <div className="trust-item"><FaShieldAlt /> Secure Payments</div>
          <div className="trust-item"><FaUndo /> 30-Day Returns</div>
          <div className="trust-item"><FaHeadset /> 24/7 Support</div>
        </div>
      </section>

      {/* ── Quick Offer Banners ──────────────── */}
      <section className="offer-banners">
        {OFFERS.map((o) => (
          <Link key={o.label} to={o.link} className="offer-card">
            <span className="offer-emoji">{o.emoji}</span>
            <div>
              <strong>{o.label}</strong>
              <span>{o.sub}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Categories ──────────────────────── */}
      <section className="home-section">
        <div className="section-head">
          <h2>Shop by Category</h2>
          <Link to="/products" className="see-all">See All <FaArrowRight /></Link>
        </div>
        <div className="cat-row">
          {CATEGORIES.map(({ name, icon, color, bg }) => (
            <Link key={name} to={`/products?category=${name}`} className="cat-tile" style={{ background: bg }}>
              <span className="cat-emoji">{icon}</span>
              <span className="cat-name" style={{ color }}>{name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Flash Sale ──────────────────────── */}
      <section className="flash-sale-bar">
        <div className="flash-left">
          <span className="flash-badge">⚡ FLASH SALE</span>
          <h3>Deals of the Day</h3>
        </div>
        <div className="flash-timer">
          <span>Ends in:</span>
          <div className="timer">
            <span className="t-block">{h}<small>hr</small></span>
            <span className="t-sep">:</span>
            <span className="t-block">{m}<small>min</small></span>
            <span className="t-sep">:</span>
            <span className="t-block">{s}<small>sec</small></span>
          </div>
        </div>
        <Link to="/products?discount=true" className="btn btn-primary flash-btn">View All Deals</Link>
      </section>

      {/* ── Featured Products ────────────────── */}
      <section className="home-section">
        <div className="section-head">
          <h2>Featured Products</h2>
          <Link to="/products" className="see-all">View All <FaArrowRight /></Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : featuredProducts.length === 0 ? (
          <div className="no-products">
            <p>No featured products found. <Link to="/products">Browse all →</Link></p>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Promo Row ────────────────────────── */}
      <section className="promo-row">
        <div className="promo-card promo-blue">
          <div>
            <h3>New User? Get 20% Off</h3>
            <p>Use code: <strong>FIRST20</strong></p>
            <Link to="/register" className="btn btn-primary" style={{ marginTop: 10 }}>Register Now</Link>
          </div>
          <span className="promo-icon">🎁</span>
        </div>
        <div className="promo-card promo-orange">
          <div>
            <h3>Download Our App</h3>
            <p>Exclusive app-only deals every day</p>
            <button className="btn btn-secondary" style={{ marginTop: 10 }}>Coming Soon</button>
          </div>
          <span className="promo-icon">📲</span>
        </div>
      </section>

    </div>
  );
};

export default Home;
