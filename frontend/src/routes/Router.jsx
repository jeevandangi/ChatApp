import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../pages/LoginAndLogOutPages";
import { Home } from "../pages/Home";
import { PrivateRoute } from "../utils/PrivateRoute";





const Router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <PrivateRoute>
            <Home />
        </PrivateRoute>,
        children: [
            {
                path: "/home",
                element: <Home />
            }
        ]
    }
])
export { Router }