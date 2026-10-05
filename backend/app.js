import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import cookieParser from 'cookie-parser';


dotenv.config();

import todoRoute from './todo/todoRoute.js';
import categoryRoute from './category/categoryRoute.js';
import userRoute from './users/userRoute.js';
import connectDB from './config/db.js';


const app = express();
app.use(cookieParser()); // is middleware that allows Express to read cookies sent by the browser.

app.use(express.json()); //middleware that allows your server to read JSON data sent in the request body.
//like in body of post request, we send data in json format, so we need this middleware to read that data
//If a request contains JSON, parse it and put the resulting JavaScript object in req.body.

app.use('/todo', todoRoute);
app.use('/category', categoryRoute);

//user routes
app.use('/auth', userRoute)


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