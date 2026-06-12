import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-col">
          <h4>About ShopEZZ</h4>
          <ul>
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Press</Link></li>
            <li><Link to="#">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help & Support</h4>
          <ul>
            <li><Link to="#">FAQ</Link></li>
            <li><Link to="#">Shipping Info</Link></li>
            <li><Link to="#">Returns</Link></li>
            <li><Link to="#">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products?category=Electronics">Electronics</Link></li>
            <li><Link to="/products?category=Fashion">Fashion</Link></li>
            <li><Link to="/products?category=Home & Kitchen">Home & Kitchen</Link></li>
            <li><Link to="/products?category=Books">Books</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Policies</h4>
          <ul>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Use</Link></li>
            <li><Link to="#">Cancellation</Link></li>
            <li><Link to="#">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-logo">Shop<span>EZZ</span></span>
          <p>&copy; {new Date().getFullYear()} ShopEZZ. All rights reserved. A MERN Stack Project.</p>
          <div className="footer-badges">
            <span>🔒 Secure</span>
            <span>✅ Verified</span>
            <span>🚀 Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
