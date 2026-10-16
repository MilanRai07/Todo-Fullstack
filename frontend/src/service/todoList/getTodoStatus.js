import { API_BASE_URL } from "../../config/baseApi"

export const getTodoStatus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/todo/todo-status`, {
            method: "GET",
            credentials: "include"
        })
        const data = await response.json();
        if (!response.ok) {
            console.log(data.message || "Can't get status")
        }
        return data;
    } catch (err) {
        throw new Error(err.message)
    }
}