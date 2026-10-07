import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

export const profileEdit = async (newData) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile-edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(newData)
    })

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update")
    }

    return data;
}

export const useProfileEdit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileEdit,
        onSuccess: (data) => queryClient.setQueryData(["currentUser"], data)
    })
}