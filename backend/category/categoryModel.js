import mongoose from "mongoose";
export const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
    },
    {
        timestamps: true
    }

)
const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;