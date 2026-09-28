import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed", "In Progress"],
            default: "Pending"
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        priority: {
            type: String,
            enum: ["Moderate", "High", "Low"],
            required: true
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true //for createdAt and updatedAt
    }
)
const TodoModel = mongoose.model("Todo", todoSchema);
//Todo will be the name of the mongoose model, it helps to interactfor CRUD
//Todo changes to todos (to lowercase and pluralized) as collection. i.e. todos
export default TodoModel;