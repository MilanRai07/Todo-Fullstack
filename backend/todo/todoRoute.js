import express from 'express';
import { getTodo, postTodo, getSingleTodo, deleteTodo, updateTodo } from './todoController.js';
import upload from '../middleware/upload.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);//this repplaces the below each middleware added code, instead we can add this middleware to the router itself,
//so all has the middelware applies to it.

// router.post("/todo", verifyToken, postTodo);
// router.get("/todo", verifyToken, getTodo);
// router.get("/todo/:id", verifyToken, getSingleTodo);
// router.delete("/todo/:id", verifyToken, deleteTodo);
// router.put("/todo/:id", verifyToken, updateTodo);
router.get('/', getTodo);
router.post('/', upload.single('image'), postTodo);
router.get('/:id', getSingleTodo)
router.delete('/:id', deleteTodo)
router.put('/:id', upload.single('image'), updateTodo)

export default router;