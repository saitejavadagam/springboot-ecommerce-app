const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {

    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    });

    if (res.status == 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "API error");
    }

    return res.json();
}