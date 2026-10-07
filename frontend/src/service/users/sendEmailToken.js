import { API_BASE_URL } from "../../config/baseApi";

export const sendEmailToken = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/send-email-token`, {
        method: "POST",
        credentials: "include"
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to send verification email");
    }

    return data;
};
