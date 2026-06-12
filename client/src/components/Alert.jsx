import React from 'react';

const Alert = ({ variant = 'info', children }) => {
  const getStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        };
      case 'danger':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        };
      case 'info':
      default:
        return {
          backgroundColor: 'rgba(99, 102, 241, 0.12)',
          color: '#6366f1',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        };
    }
  };

  if (!children) return null;

  return (
    <div style={{
      padding: '0.9rem 1.25rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      ...getStyles()
    }}>
      {children}
    </div>
  );
};

export default Alert;
