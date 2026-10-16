import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

export const deleteTodo = async ({ id }) => {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    let data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to delete item");
    }
    return data;
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todoList"] });
            queryClient.invalidateQueries({ queryKey: ["todoStatus"] });
        }
    });
};