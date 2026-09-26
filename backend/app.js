import express from 'express';
import dotenv from 'dotenv';
import todoRoute from './todo/todoRoute.js';
import categoryRoute from './category/categoryRoute.js';
import connectDB from './config/db.js';

const app = express();
dotenv.config();
app.use(express.json());

app.use('/todo', todoRoute);
app.use('/category', categoryRoute);

connectDB();

app.get('/', (req, res) => {
    res.send('to do app is running')
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
});