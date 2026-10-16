import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi";

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to log out.");
    }

    return data;
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["currentUser"], { success: false });
        },
    });
};
