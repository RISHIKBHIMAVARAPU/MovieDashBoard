import express from 'express';
import * as AdminController from '../controllers/adminController.js';
import { adminAuth } from '../middlewares/auth.js';
const router = express.Router();

router.post('/adminLogin', AdminController.adminLoginController);
router.post('/adminLogout', adminAuth, AdminController.adminLogoutController);
router.get('/readAllCachedMovies', adminAuth, AdminController.readAllCachedMoviesController);
router.delete('/deleteAllCachedMovies', adminAuth, AdminController.deleteAllCachedMoviesController);

export default router;
