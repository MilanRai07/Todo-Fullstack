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
            enum: ["pending", "complete", "processing"],
            default: "pending"
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
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