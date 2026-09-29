import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';


dotenv.config();
import todoRoute from './todo/todoRoute.js';
import categoryRoute from './category/categoryRoute.js';
import connectDB from './config/db.js';

const app = express();

app.use(express.json());

app.use('/todo', todoRoute);
app.use('/category', categoryRoute);

// Multer error handler here beuase multer always runs befire the controller, 
//if such error occurs we odn't call controller
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                message: 'Image must be under 5MB',
            });
        }

        return res.status(400).json({
            message: err.message,
        });
    }

    res.status(400).json({
        message: err.message,
    });
});

connectDB();

app.get('/', (req, res) => {
    res.send('to do app is running');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});