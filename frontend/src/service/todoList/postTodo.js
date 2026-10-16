import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

export const postTodo = async (todoData) => {
    const body = new FormData();
    Object.entries(todoData).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            body.append(key, value);
        }
    });

    const response = await fetch(`${API_BASE_URL}/todo`, {
        method: "POST",
        credentials: "include",
        body
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add todo")
    }
    return data;
}

export const usePostTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todoList'] })
            queryClient.invalidateQueries({ queryKey: ['allTodoList'] })
        }
    })
}