import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

//fetch the category
export const getCategory = async () => {
    const response = await fetch(`${API_BASE_URL}/category`, {
        method: "GET",
        credentials: "include"
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to load category")
    }
    return data
}

//add category
export const addCategory = async ({ title }) => {
    const response = await fetch(`${API_BASE_URL}/category`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add category");
    }

    return data;
};

export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] })
    });
};

//update the category

export const updateCategory = async ({ id, title }) => {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update category")
    }
    return data
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] })
    })
}

//delete category

export const deleteCategory = async ({ id }) => {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete category");
    }

    return data;
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["category"] })
    });
};