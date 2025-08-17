import express from 'express';
import * as AdminController from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/auth.js';
import * as MovieController from '../controllers/movieController.js';
const router = express.Router();

router.post('/login', AdminController.adminLoginController);
router.post('/logout', adminAuth, AdminController.adminLogoutController);
router.get('/readAllCachedMovies', adminAuth, AdminController.readAllCachedMoviesController);
router.delete('/deleteAllCachedMovies', adminAuth, AdminController.deleteAllCachedMoviesController);
router.get('/allMovieDetails', adminAuth, MovieController.getAllMovieDetailsController);
export default router;
