import express from 'express';
import dotenv from 'dotenv';
import todoRoute from './todo/todoRoute.js';
import categoryRoute from './category/categoryRoute.js';
import connectDB from './config/db.js';
import multer from 'multer';


const app = express();
dotenv.config();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/todo', todoRoute);
app.use('/category', categoryRoute);

//Without it, a rejected file (wrong type, over 5MB) gives the client a generic 500.
//for multer uploads, we need to gives error message
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Image must be under 5MB' });
    }
    res.status(400).json({ message: err.message });
});
connectDB();

app.get('/', (req, res) => {
    res.send('to do app is running')
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
});