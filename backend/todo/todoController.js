import mongoose from "mongoose";
import TodoModel from "./todoModel.js"
import CategoryModel from "../category/categoryModel.js";
import uploadToCloudinary from "../utils/cloudinary/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/cloudinary/deleteFromCloudinary.js";

//to post the list
export const postTodo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    let uploadedImage = null;

    try {
        if (!req.body.category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const category = await CategoryModel.findOne({
            _id: req.body.category,
            userId: req.userId
        });
        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        // Upload image to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);

        uploadedImage = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        const todo = await TodoModel.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            priority: req.body.priority,
            image: uploadedImage,
            userId: req.userId // Assign the userId from the request (set by verifyToken middleware)
        });

        res.status(201).json(todo);
    } catch (err) {
        //somtime the db failed to add but but the cloudinary image is uploaded before creation happens,
        // we delete the orphaned image from Cloudinary
        //if anyerror comes
        if (uploadedImage?.public_id) {
            await deleteFromCloudinary(uploadedImage.public_id).catch(() => { });
        }

        res.status(400).json({ message: err.message });
    }
};

//to get the todo lists
export const getTodo = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const title = req.query.title || "";
        const status = req.query.status || "";
        const sort = req.query.sort === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;

        const filter = {}
        if (title) {
            filter.title = { $regex: title, $options: "i" } //i for case insensitive
        }
        if (status) {
            filter.status = status
        }
        filter.userId = req.userId; // Filter todos by the authenticated user's ID

        const todos = await TodoModel.find(filter).
            sort({ createdAt: sort }).
            skip(skip).
            limit(limit).
            populate("category");
        const totalItem = await TodoModel.countDocuments(filter);
        const totalPage = Math.ceil(totalItem / limit);
        res.json({
            success: true,
            items: todos,
            pagination: {
                currentPage: page,
                totalPage,
                totalItem,
                limit,
                hasNextPage: page < totalPage
            }

        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//to get single
export const getSingleTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findOne({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!todo) {
            return res.status(404).json({
                message: "Todo item not found"
            })
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//to delete an item
export const deleteTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId,
        });
        if (!todo) {
            return res.status(404).json({ message: "Item not found" });
        }

        // If the todo had an image on Cloudinary, we delete it too
        if (todo.image?.public_id) {
            await deleteFromCloudinary(todo.image.public_id).catch(() => { });
        }

        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//to update an item
export const updateTodo = async (req, res) => {
    let uploadedImage = null;

    try {
        const existingTodo = await TodoModel.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!existingTodo) {
            return res.status(404).json({ message: "Item not found" });
        }

        //collect the body from user
        const updates = { ...req.body };
        delete updates.userId;

        // Example validation I can do the validfaiton from frontend also
        if (req.body.category === "") {
            return res.status(400).json({ message: "Category is required" });
        }
        if (req.body.category !== undefined) {
            if (!mongoose.isValidObjectId(req.body.category)) {
                return res.status(400).json({ message: "Invalid category" });
            }

            const category = await CategoryModel.findOne({
                _id: req.body.category,
                userId: req.userId
            });
            if (!category) {
                return res.status(400).json({ message: "Category not found" });
            }
        }

        // If user uploaded a new image, first we psh to cloudinary
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            uploadedImage = {
                url: result.secure_url, //url by cloudinary
                public_id: result.public_id, //id by cloudinary
            };
            //add the new uploadedImage to image key.
            updates.image = uploadedImage;
        }

        const todo = await TodoModel.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            updates,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        // If we uploaded a new image AND the old one had a Cloudinary image,
        // delete the old one now that the DB is safely updated
        if (uploadedImage && existingTodo.image?.public_id) {
            await deleteFromCloudinary(existingTodo.image.public_id).catch(() => { });
        }
        res.json(todo);
    } catch (err) {
        // if somehow db failed — 
        // clean up the newly uploaded orphaned Cloudinary image
        if (uploadedImage?.public_id) {
            await deleteFromCloudinary(uploadedImage.public_id).catch(() => { });
        }
        res.status(500).json({ message: err.message });
    }
};
