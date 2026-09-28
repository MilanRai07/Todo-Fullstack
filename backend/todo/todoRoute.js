import express from 'express';
import { getTodo, postTodo, getSingleTodo, deleteTodo, updateTodo } from './todoController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getTodo);
router.post('/', upload.single('image'), postTodo);
router.get('/:id', getSingleTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', upload.single('image'), updateTodo)

export default router;