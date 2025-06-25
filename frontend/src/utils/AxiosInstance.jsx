import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axiosInstance.get("/api/v1/user/refresh-token");
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh failed – redirect to login or handle logout
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { axiosInstance };
