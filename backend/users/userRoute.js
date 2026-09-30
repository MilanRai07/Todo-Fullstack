import express from 'express';
import { login, logOut, signUp, verifyEmail } from './userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verify-email', verifyEmail);
router.post('/logout', logOut);
router.post('/login', login);

export default router;