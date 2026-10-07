import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

export const emailVerification = async ({ token }) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })

    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to verify the email")
    }
    return data;
}

export const useEmailVerify = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: emailVerification,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    })
}