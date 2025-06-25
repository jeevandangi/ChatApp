import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { ApiResponseHandler } from "./ApiResponseHandler";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuthentication = async () => {
        try {
            const response = await ApiResponseHandler("/api/v1/users/getUser");
            console.log(response);

            if (response?.data?.data) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        } catch (error) {
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuthentication();
    }, []);

    if (loading) return <h1>Loading...</h1>;

    return isAuthenticated ? children : <Navigate to="/" replace />;
}

export { PrivateRoute };
