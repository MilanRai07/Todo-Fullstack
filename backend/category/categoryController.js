import CategoryModel from "./categoryModel.js"

export const postCategory = async (req, res) => {
    try {
        const category = await CategoryModel.create({
            title: req.body.title
        })
        res.status(201).json(category)
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Category title already exists"
            });
        }
        console.log(err)
        res.status(400).json({
            message: err.message
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json({
            success: true,
            data: categories
        })
    } catch (err) {

        res.status(400).json({
            message: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const deletedCatgory = await CategoryModel.findByIdAndDelete(req.params.id);
        console.log(req.params.id)

        if (!deletedCatgory) {
            return res.status(404).json({
                message: 'No such item'
            })
        }
        res.json({
            message: 'item deleted successfully'
        })
    } catch (err) {
        req.status(400).json({
            message: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json(updatedCategory);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Category title already exists"
            });
        }

        res.status(400).json({
            message: err.message
        });
    }
};