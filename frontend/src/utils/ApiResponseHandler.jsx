import { axiosInstance } from "./Axiosinstance";

const ApiResponseHandler = async (endpoint, method = 'GET', data = null, config = {}) => {
    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            data,
            ...config,
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export { ApiResponseHandler };
