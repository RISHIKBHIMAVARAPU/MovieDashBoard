import express from 'express';
import * as MovieController from '../controllers/movieController.js';
import { authenticate, adminAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/search/:name', authenticate, MovieController.searchMovieController);
router.get('/genreCounts', authenticate, MovieController.genreCountsController);
router.get('/averageRating', authenticate, MovieController.getAverageRatingController);
router.get('/averageRuntimeByYear', authenticate, MovieController.getAverageRuntimeByYearController);
router.get('/details/:imdbId', authenticate, MovieController.getMovieDetailsByImdbIdController);
router.get('/getAllMovieDetails', adminAuth, MovieController.getAllMovieDetailsController);

export default router;
