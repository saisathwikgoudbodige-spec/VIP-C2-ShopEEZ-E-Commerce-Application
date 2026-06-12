import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Shop<span className="logo-accent">EZ</span></h3>
          <p>Your one-stop destination for effortless online shopping. Experience the premium future of e-commerce today.</p>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} ShopEZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
