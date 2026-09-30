import express from 'express';
import { signUp, verifyEmail } from './userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verify-email', verifyEmail)

export default router;