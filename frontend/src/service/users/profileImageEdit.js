import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config/baseApi";

export const profileImageEdit = async (imageData) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile-image-edit`, {
        method: "PUT",
        credentials: "include",
        body: imageData
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update profile image");
    }

    return data;
};

export const useProfileImageEdit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileImageEdit,
        onSuccess: (data) => queryClient.setQueryData(["currentUser"], data)
    });
};
