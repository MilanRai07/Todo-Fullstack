import { API_BASE_URL } from "../../config/baseApi";

export const requestPasswordReset = async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to send password reset code");
    }

    return data;
};

export const resetPassword = async ({ token, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
    }

    return data;
};
