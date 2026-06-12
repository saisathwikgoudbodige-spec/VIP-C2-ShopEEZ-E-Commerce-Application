import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      gap: '1.5rem'
    }}>
      <FaExclamationTriangle style={{ fontSize: '4rem', color: 'var(--warning)' }} />
      <h1 style={{ fontSize: '5rem', fontWeight: '900', color: 'var(--primary)', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
