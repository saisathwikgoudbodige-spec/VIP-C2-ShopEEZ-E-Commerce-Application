import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { FaLaptop, FaTshirt, FaUtensils, FaBook, FaRunning, FaArrowRight, FaShieldAlt, FaTruck, FaUndo, FaHeadset, FaStar } from 'react-icons/fa';
import './Home.css';

const HERO_SLIDES = [
  {
    tag: 'New Season 2026',
    headline: 'Shop Smarter.\nLive Better.',
    sub: 'Discover curated collections with exclusive discounts up to 50% off — delivered to your door.',
    cta: { label: 'Explore Now', to: '/products' },
    ctaSecondary: { label: 'View Deals', to: '/products?discount=true' },
    accentColor: '#7c5cfc',
  },
  {
    tag: 'Tech Picks',
    headline: 'Next-Gen\nGadgets.',
    sub: 'Top-rated laptops, headphones, smartwatches and more — handpicked for modern living.',
    cta: { label: 'Shop Electronics', to: '/products?category=Electronics' },
    ctaSecondary: { label: 'See All', to: '/products' },
    accentColor: '#00d8ff',
  },
  {
    tag: 'Fashion Drop',
    headline: 'Wear What\nYou Love.',
    sub: 'Trending styles, iconic brands. Free shipping on orders above ₹999.',
    cta: { label: 'Shop Fashion', to: '/products?category=Fashion' },
    ctaSecondary: { label: 'Wishlist', to: '/wishlist' },
    accentColor: '#f550a6',
  },
];

const CATEGORIES = [
  { name: 'Electronics', icon: <FaLaptop />, color: '#7c5cfc', bg: 'rgba(124,92,252,0.12)' },
  { name: 'Fashion',     icon: <FaTshirt />, color: '#f550a6', bg: 'rgba(245,80,166,0.12)' },
  { name: 'Home & Kitchen', icon: <FaUtensils />, color: '#0fd68a', bg: 'rgba(15,214,138,0.12)' },
  { name: 'Books',       icon: <FaBook />,   color: '#ffb547', bg: 'rgba(255,181,71,0.12)' },
  { name: 'Sports',      icon: <FaRunning />, color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
];

const TRUST_ICONS = [
  { icon: <FaTruck />, label: 'Free Delivery', sub: 'On orders above ₹999' },
  { icon: <FaShieldAlt />, label: 'Secure Payments', sub: '100% protected' },
  { icon: <FaUndo />, label: 'Easy Returns', sub: '30-day hassle-free' },
  { icon: <FaHeadset />, label: '24/7 Support', sub: 'Always here for you' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector((s) => s.product);

  const [slide, setSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 7, m: 42, s: 0 });

  useEffect(() => { dispatch(fetchFeaturedProducts()); }, [dispatch]);

  // Auto-advance hero
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Countdown
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const current = HERO_SLIDES[slide];

  return (
    <div className="home">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero" style={{ '--hero-color': current.accentColor }}>
        <div className="hero-bg-orb" />

        <div className="hero-content animate-fade-up">
          <span className="hero-tag">{current.tag}</span>
          <h1 className="hero-headline">{current.headline.split('\n').map((l, i) => (
            <React.Fragment key={i}>{i > 0 && <br />}<span className={i === 1 ? 'gradient-text' : ''}>{l}</span></React.Fragment>
          ))}</h1>
          <p className="hero-sub">{current.sub}</p>

          <div className="hero-ctas">
            <Link to={current.cta.to} className="btn btn-primary hero-btn">
              {current.cta.label} <FaArrowRight />
            </Link>
            <Link to={current.ctaSecondary.to} className="btn btn-secondary hero-btn">
              {current.ctaSecondary.label}
            </Link>
          </div>

          <div className="hero-stats">
            {[['50K+', 'Products'], ['1M+', 'Happy Customers'], ['4.8★', 'Rating']].map(([val, lbl]) => (
              <div key={lbl} className="hero-stat">
                <strong>{val}</strong><span>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-visual">
          <div className="hero-card-float glass-card">
            <FaStar style={{ color: '#ffb547' }} />
            <span>Rated #1 E-Commerce App 2026</span>
          </div>
          <div className="hero-glow-ring" />
          <div className="hero-img-wrapper">
            <div className="hero-img-placeholder">
              <span>🛍️</span>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────── */}
      <section className="trust-strip">
        {TRUST_ICONS.map(({ icon, label, sub }) => (
          <div key={label} className="trust-item glass-card">
            <div className="trust-icon">{icon}</div>
            <div>
              <strong>{label}</strong>
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── CATEGORIES ───────────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Browse Categories</h2>
          <Link to="/products" className="see-all-link">See All <FaArrowRight /></Link>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(({ name, icon, color, bg }) => (
            <Link key={name} to={`/products?category=${name}`} className="cat-card glass-card" style={{ '--cat-color': color, '--cat-bg': bg }}>
              <div className="cat-icon">{icon}</div>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── DEALS COUNTDOWN ──────────────────────────── */}
      <section className="deals-banner glass-card">
        <div className="deals-left">
          <span className="badge badge-danger">🔥 Flash Sale</span>
          <h2>Deal of the Day</h2>
          <p>Massive discounts across top categories. Don't miss out!</p>
          <Link to="/products?discount=true" className="btn btn-primary">
            Grab the Deal <FaArrowRight />
          </Link>
        </div>
        <div className="deals-timer">
          <p className="timer-label">Ends In:</p>
          <div className="timer-blocks">
            {[['h', 'Hours'], ['m', 'Mins'], ['s', 'Secs']].map(([key, lbl]) => (
              <div key={key} className="timer-block glass-card">
                <strong>{pad(timeLeft[key])}</strong>
                <span>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────── */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Collections</h2>
          <Link to="/products" className="see-all-link">View All <FaArrowRight /></Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : featuredProducts.length === 0 ? (
          <div className="empty-products">
            <span>🛒</span>
            <p>No featured products yet. <Link to="/products">Browse all products</Link></p>
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── PROMO BANNER ─────────────────────────────── */}
      <section className="promo-row">
        <div className="promo-card glass-card promo-purple">
          <div className="promo-text">
            <h3>Exclusive Members</h3>
            <p>Sign up and get 20% off your first order</p>
            <Link to="/register" className="btn btn-primary">Join Free</Link>
          </div>
          <div className="promo-emoji">🎁</div>
        </div>
        <div className="promo-card glass-card promo-pink">
          <div className="promo-text">
            <h3>Refer & Earn</h3>
            <p>Invite friends and earn ₹200 store credit</p>
            <Link to="/profile" className="btn btn-accent">Refer Now</Link>
          </div>
          <div className="promo-emoji">🤝</div>
        </div>
      </section>

    </div>
  );
};

export default Home;
