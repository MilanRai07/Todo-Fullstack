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
            enum: ["pending", "complete"],
            default: "pending"
        }
    },
    {
        timestamps: true //for createdAt and updatedAt
    }
)
const TodoModel = mongoose.model("Todo", todoSchema);
//Todo will be the name of the mongoose model, it helps to interactfor CRUD
//Todo changes to todos (to lowercase and pluralized) as collection.
export default TodoModel;