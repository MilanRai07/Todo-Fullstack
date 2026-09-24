import express from 'express';
import { getTodo } from './todoController.js';
import { postTodo } from './todoController.js';
import { getSingleTodo } from './todoController.js';
import { deleteTodo } from './todoController.js';
import { updateTodo } from './todoController.js';

const router = express.Router();

router.get('/', getTodo);
router.post('/', postTodo);
router.get('/:id', getSingleTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', updateTodo)

export default router;