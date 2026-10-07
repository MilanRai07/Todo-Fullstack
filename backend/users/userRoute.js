import express from 'express';
import { forgotPassword, login, logOut, resetPassword, changePassword, signUp, verifyEmail, checkAuth, verifyEmailAfterLogin, profileEdit, profileImageEdit, deleteProfile } from './userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
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
router.put('/change-password', verifyToken, changePassword);
router.post('/send-email-token', verifyToken, verifyEmailAfterLogin);
router.put('/profile-edit', verifyToken, profileEdit)
router.put('/profile-image-edit', verifyToken, upload.single('image'), profileImageEdit)
router.delete('/profile', verifyToken, deleteProfile)

export default router;