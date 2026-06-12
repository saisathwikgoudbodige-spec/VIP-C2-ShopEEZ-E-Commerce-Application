import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { FaLaptop, FaTshirt, FaUtensils, FaBook, FaRunning, FaClock } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector((state) => state.product);

  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 12 });

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  const categories = [
    { name: 'Electronics', icon: <FaLaptop />, color: '#6366f1' },
    { name: 'Fashion', icon: <FaTshirt />, color: '#ec4899' },
    { name: 'Home & Kitchen', icon: <FaUtensils />, color: '#10b981' },
    { name: 'Books', icon: <FaBook />, color: '#f59e0b' },
    { name: 'Sports', icon: <FaRunning />, color: '#3b82f6' }
  ];

  return (
    <div className="home-page">
      {/* Hero Banner Carousel */}
      <div className="hero-carousel-container">
        <Slider {...carouselSettings}>
          <div className="hero-slide slide-1">
            <div className="hero-slide-content">
              <span className="hero-tagline">NEW SEASON ARRIVALS</span>
              <h1>Elevate Your Style & Experience</h1>
              <p>Discover handpicked collections with exclusive launch discounts up to 40% off.</p>
              <Link to="/products" className="btn btn-primary">Explore Catalog</Link>
            </div>
          </div>
          <div className="hero-slide slide-2">
            <div className="hero-slide-content">
              <span className="hero-tagline">SMART LIVING HUB</span>
              <h1>Next-Gen Tech Gadgets</h1>
              <p>Top performance laptops, noise-canceling headphones, and luxury smartwatches.</p>
              <Link to="/products?category=Electronics" className="btn btn-accent">Shop Electronics</Link>
            </div>
          </div>
        </Slider>
      </div>

      {/* Category Quick Links */}
      <section className="categories-section">
        <h2 className="section-title">Browse By Category</h2>
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?category=${cat.name}`}
              className="category-card glass-card"
              style={{ '--accent-color': cat.color }}
            >
              <div className="category-icon-wrapper" style={{ color: cat.color }}>
                {cat.icon}
              </div>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="deals-section glass-card">
        <div className="deals-header">
          <div>
            <span className="badge badge-danger">Limited Offer</span>
            <h2>Deals of the Day</h2>
          </div>
          <div className="countdown-timer">
            <FaClock className="timer-icon" />
            <span>Ends In:</span>
            <div className="timer-box">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>h :
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>m :
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>s
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <h2 className="section-title">Featured Collections</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
