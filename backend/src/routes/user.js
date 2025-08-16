import express from 'express';
import * as UserController from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';
const router = express.Router();

router.post('/signup', UserController.signupController);
router.post('/login', UserController.loginController);
router.post('/logout', authenticate, UserController.logoutController);

export default router;
