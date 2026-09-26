import express from 'express';
import { deleteCategory, getCategory, postCategory, updateCategory } from './categoryController.js';

const router = express.Router();

router.post('/', postCategory);
router.get('/', getCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory)
export default router;