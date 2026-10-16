import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi";

export const updateTodo = async ({ id, ...todoData }) => {
    const body = new FormData();

    Object.entries(todoData).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (key === "image") {
            if (value instanceof Blob) {
                body.append(key, value);
            }
            return;
        }

        body.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
        method: "PUT",
        credentials: "include",
        body,
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update todo");
    }

    return data;
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoList"] });
            queryClient.invalidateQueries({ queryKey: ["allTodoList"] });
            queryClient.invalidateQueries({ queryKey: ["todoStatus"] });
        },
    });
};