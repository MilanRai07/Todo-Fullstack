import express from 'express';
import { forgotPassword, login, logOut, resetPassword, signUp, verifyEmail } from './userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verify-email', verifyEmail);
router.post('/logout', logOut);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;