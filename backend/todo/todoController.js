import TodoModel from "./todoModel.js"
import "../category/categoryModel.js"
import { unlink } from "node:fs/promises";
import path from "node:path";

//to post the list
export const postTodo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }
    try {
        const todo = await TodoModel.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            priority: req.body.priority,
            image: `/uploads/todos/${req.file.filename}`
        })
        res.status(201).json(todo);
    } catch (err) {
        if (req.file) await unlink(req.file.path).catch(() => { });
        //Multer saves the file to disk before the controller runs. 
        // If TodoModel.create fails (e.g. a missing title), 
        // the image stays on the server as an orphan. so we Delete it in the catch
        res.status(400).json({
            message: err.message
        })
    }
}

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
        const todo = await TodoModel.findById(req.params.id);
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
        const todo = await TodoModel.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({
                message: "Item not found"
            })
        }

        //if there is todo item and has image delete that also
        if (todo.image?.startsWith("/uploads/todos/")) {
            const imagePath = path.join("uploads/todos", path.basename(todo.image));
            await unlink(imagePath).catch(() => { });
        }
        res.json({
            message: "Item deleted successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//to update an item
export const updateTodo = async (req, res) => {
    try {

        //first we search for the item with the params.id 
        //mongo db is searched for the item with such id
        const existingTodo = await TodoModel.findById(req.params.id);

        //what happens if it didn't find the id?
        //even though updating failed, but but multer runs before controller runs.
        //if user has already added a new image and hit update button,
        //may be there is no such item id and responds "no such items"
        //stil the new image is stored. This is not good 
        //so, if there is req.file(new uploaded image), we delete is using unlihnk
        //then "Item not found" is sent 
        if (!existingTodo) {
            if (req.file) await unlink(req.file.path).catch(() => { });
            return res.status(404).json({
                message: "Item not found"
            })
        }

        //if the item is existed in database, then 
        //catch catch all the req.body
        const updates = { ...req.body };
        //example of validation
        if (req.body.category == "") {
            res.json({
                message: "Category is requried"
            })
        }

        //check if user has uploaded an image
        //if uploaded, then assign the image to updates object
        //if it was not updated then, it is undefined
        //the old image will be there unaltered.
        if (req.file) {
            updates.image = `/uploads/todos/${req.file.filename}`;
        }

        const todo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                returnDocument: "after",
                runValidators: true
            }
        )

        //we have already checked the existingTodo, and here also we are checking, it looks redundant
        //but for additional safety guard
        if (!todo) {
            if (req.file) await unlink(req.file.path).catch(() => { });
            return res.status(404).json({
                message: "Item not found"
            })
        }

        //now if the the user has uploaded new image and we have existing old image,
        //we delete the old image
        if (req.file && existingTodo.image?.startsWith("/uploads/todos/")) {
            const oldImagePath = path.join("uploads/todos", path.basename(existingTodo.image));
            await unlink(oldImagePath).catch(() => { });
        }
        //throw response, if success
        res.json(todo)
    } catch (err) {
        //again if something goes wrong in process
        if (req.file) await unlink(req.file.path).catch(() => { });
        res.status(500).json({
            message: err.message
        })
    }
}
