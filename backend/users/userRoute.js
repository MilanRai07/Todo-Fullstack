import express from 'express';
import { forgotPassword, login, logOut, resetPassword, signUp, verifyEmail, checkAuth, verifyEmailAfterLogin } from './userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router()

//user auth
//this checks wheter cookie sent by browser is valid or not, if valid it will call checkAuth function in userController.js
router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', signUp);
router.post('/verify-email', verifyEmail);
router.post('/logout', logOut);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/send-email-token', verifyEmailAfterLogin);

export default router;