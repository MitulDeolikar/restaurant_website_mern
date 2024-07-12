import mongoose from "mongoose";
import validator from "validator";

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "The name should be at least 4 characters"],
    maxLength: [20, "The name is too long"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please enter a valid Email "],
  },
  taste: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  service: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  ambience: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    maxLength: [500, "The comment is too long"],
  },
});

export const Review = mongoose.model("Review", reviewSchema);
