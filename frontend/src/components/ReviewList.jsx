import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaRegUser, FaStar } from 'react-icons/fa';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const ReviewList = ({ onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/reviews');
        if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          console.error('Failed to fetch reviews:', response.data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false); // Set loading state to false once reviews are fetched
      }
    };

    fetchReviews();
  }, []);

  return (
    <section style={{ maxHeight: '400px', overflowY: 'auto' }}>
      <h2>Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <div className="review-header">
              <div className="user-icon">
                <FaRegUser />
              
              <h3>{review.name}</h3>
              </div>
            </div>
            <p>{review.comment}</p>
            <div className="stars">
              <div>Taste: {Array(review.taste).fill('⭐').map((star, index) => <span key={index}>{star}</span>)}</div>
              <div>Service: {Array(review.service).fill('⭐').map((star, index) => <span key={index}>{star}</span>)}</div>
              <div>Ambience: {Array(review.ambience).fill('⭐').map((star, index) => <span key={index}>{star}</span>)}</div>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
      <button type="button" onClick={onBack}>
        <FaTimes />  Close
      </button>
    </section>
  );
};

export default ReviewList;
