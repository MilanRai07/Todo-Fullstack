import { API_BASE_URL } from "../../config/baseApi";

export const changePassword = async (passwordData) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(passwordData)
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
    }

    return data;
};
