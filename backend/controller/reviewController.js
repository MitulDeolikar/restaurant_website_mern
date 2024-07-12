import { Review } from '../models/reviewSchema.js';
import ErrorHandler from '../error/error.js';

export const addReview = async (req, res, next) => {
  const { name, email, taste, service, ambience, comment } = req.body;

  if (!name || !email || !taste || !service || !ambience || !comment) {
    return next(new ErrorHandler("Please enter all the details", 400));
  }

  try {
    const review = await Review.create({ name, email, taste, service, ambience, comment });
    res.status(200).json({
      success: true,
      message: "Review submitted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
