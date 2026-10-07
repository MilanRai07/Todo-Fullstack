import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi"

export const signUp = async (signUpData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpData)
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to login");
    }
    return data;
}

export const useSignUp = () => {
    return useMutation({
        mutationFn: signUp
    })
}