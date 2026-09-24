import TodoModel from "./todoModel.js"

//to post the list
export const postTodo = async (req, res) => {
    try {
        const todo = await TodoModel.create({
            title: req.body.title
        })
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({
            message: err.mesage
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

        const skip = (page - 1) * limit;

        const filter = {}
        if (title) {
            filter.title = { $regex: title, $options: "i" } //i for case insensitive
        }
        if (status) {
            filter.status = status
        }

        const todos = await TodoModel.find(filter).
            skip(skip).
            limit(limit);
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
        const todo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (!todo) {
            return res.status(404).json({
                message: "Item not found"
            })
        }
        res.json(todo)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
