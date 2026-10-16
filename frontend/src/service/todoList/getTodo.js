import { API_BASE_URL } from "../../config/baseApi"

export const getTodo = async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, String(value));
        }
    });

    const queryString = query.toString();
    const response = await fetch(`${API_BASE_URL}/todo${queryString ? `?${queryString}` : ""}`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch data")
    }
    return data
}

export const getMissedTodo = async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.set(key, String(value));
        }
    });

    const queryString = query.toString();
    const response = await fetch(`${API_BASE_URL}/todo/missed${queryString ? `?${queryString}` : ""}`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch data")
    }
    return data
}

export const getSingleTodo = async (id) => {
    if (!id) {
        throw new Error("Todo ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/todo/${encodeURIComponent(id)}`, {
        method: "GET",
        credentials: "include",
    })
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch todo")
    }
    return data
}
