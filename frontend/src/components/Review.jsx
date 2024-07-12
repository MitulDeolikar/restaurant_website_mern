import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegUser } from 'react-icons/fa';
import ReviewList from './ReviewList'; // Import ReviewsList component

const ReviewForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tasteRating, setTasteRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);
    const [ambienceRating, setAmbienceRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [showReviews, setShowReviews] = useState(false);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/api/v1/reviews/addReview",
                { name, email, taste: tasteRating, service: serviceRating, ambience: ambienceRating, comment: reviewText },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setName("");
            setEmail("");
            setTasteRating(0);
            setServiceRating(0);
            setAmbienceRating(0);
            setReviewText("");

            // Fetch reviews again to update the list
            fetchReviews();

            navigate("/success");
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "An error occurred");
        }
    };

    const renderStars = (rating, setRating) => {
        return [...Array(5)].map((star, index) => {
            index += 1;
            return (
                <button
                    type="button"
                    key={index}
                    className={index <= rating ? "on" : "off"}
                    onClick={() => setRating(index)}
                    style={{ background: "none", border: "none" }}
                >
                    <FaStar size={24} />
                </button>
            );
        });
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/reviews');
            if (Array.isArray(response.data.reviews)) {
                setReviews(response.data.reviews);
            } else {
                console.error('Response is not an array:', response.data.reviews);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        if (showReviews) {
            fetchReviews();
        }
    }, [showReviews]);

    const handleBackToForm = () => {
        setShowReviews(false); // Hide reviews when navigating back to form
    };

    return (
        <>
            <hr />
            <section className='review' id='review'>
                <div className="container">
                    <div className="review_form_box">
                        <h1>Leave a Review</h1>
                        <p>We appreciate your feedback!</p>
                        <form onSubmit={handleReviewSubmit}>
                            <div>
                                <input 
                                    type="text" 
                                    placeholder='Name' 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder='Email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div>
                                <label>Taste</label>
                                <div className="star-rating">
                                    {renderStars(tasteRating, setTasteRating)}
                                </div>
                            </div>
                            <div>
                                <label>Service</label>
                                <div className="star-rating">
                                    {renderStars(serviceRating, setServiceRating)}
                                </div>
                            </div>
                            <div>
                                <label>Ambience</label>
                                <div className="star-rating">
                                    {renderStars(ambienceRating, setAmbienceRating)}
                                </div>
                            </div>
                            <div>
                                <textarea
                                    placeholder='Comment'
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                />
                            </div>
                            <button type='submit' className='reviewBtn'>
                                Submit Review <span><HiOutlineArrowNarrowRight/></span>
                            </button>
                            {!showReviews && (
                                <button type='button' className='reviewBtn' onClick={() => setShowReviews(true)}>
                                    View Reviews <span><HiOutlineArrowNarrowRight/></span>
                                </button>
                            )}
                        </form>
                        {showReviews && (
                            <ReviewList onBack={handleBackToForm} />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReviewForm;
