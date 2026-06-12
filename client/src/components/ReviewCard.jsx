import React from 'react';
import { FaStar, FaUser } from 'react-icons/fa';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const { user, rating, comment, createdAt } = review;

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="review-card glass-card">
      <div className="review-header">
        <div className="review-user-info">
          {user && user.avatar ? (
            <img src={user.avatar} alt={user.name} className="review-avatar" />
          ) : (
            <div className="review-avatar-placeholder">
              <FaUser />
            </div>
          )}
          <div>
            <h5 className="review-username">{user ? user.name : 'Verified Customer'}</h5>
            <span className="review-date">{formatDate(createdAt)}</span>
          </div>
        </div>
        <div className="review-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
          ))}
        </div>
      </div>
      <p className="review-comment">{comment}</p>
    </div>
  );
};

export default ReviewCard;
