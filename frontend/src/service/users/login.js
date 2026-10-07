import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

export const login = async (loginData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(loginData)
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to login");
    }
    return data;
}

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => queryClient.setQueryData(["currentUser"], data)
    })
}