import { API_BASE_URL } from "../../config/baseApi"

export const authCheck = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/check-auth`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json();

    if ([400, 401, 404].includes(response.status)) {
        return { success: false };
    }

    if (!response.ok) {
        throw new Error(data.message || "Unable to verify your session.");
    }
    return data;
}
