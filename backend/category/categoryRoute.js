import express from 'express';
import { deleteCategory, getCategory, postCategory, updateCategory } from './categoryController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);
router.post('/', postCategory);
router.get('/', getCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory)
export default router;