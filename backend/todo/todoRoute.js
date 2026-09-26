import express from 'express';
import { getTodo, postTodo, getSingleTodo, deleteTodo, updateTodo } from './todoController.js';

const router = express.Router();

router.get('/', getTodo);
router.post('/', postTodo);
router.get('/:id', getSingleTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', updateTodo)

export default router;