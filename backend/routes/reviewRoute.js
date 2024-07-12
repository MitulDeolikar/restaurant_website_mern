import express from 'express';
import { addReview, getAllReviews } from '../controller/reviewController.js';

const router = express.Router();

router.post('/addReview', addReview);
router.get('/', getAllReviews);

export default router;
