import { API_BASE_URL } from "../../config/baseApi";

export const deleteProfile = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "DELETE",
        credentials: "include"
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete profile");
    }

    return data;
};
