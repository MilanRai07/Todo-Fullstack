import mongoose from "mongoose";
export const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }

)
categorySchema.index({ userId: 1, title: 1 }, { unique: true });

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;