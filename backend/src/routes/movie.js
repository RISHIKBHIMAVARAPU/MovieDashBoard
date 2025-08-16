import express from 'express';
import * as MovieController from '../controllers/movieController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/search/:id', authenticate, MovieController.searchMovieController);
router.get('/genreCounts', authenticate, MovieController.genreCountsController);
router.get('/averageRating', authenticate, MovieController.getAverageRatingController);
router.get('/averageRuntimeByYear', authenticate, MovieController.getAverageRuntimeByYearController);

export default router;
