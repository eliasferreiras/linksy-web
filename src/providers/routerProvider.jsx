import { createBrowserRouter } from "react-router";

import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "../routes/ProtectedRoute";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        Component: ProtectedRoute,
        children: [{ index: true, Component: Home }]
    },
    {
        Component: PublicRoute,
        children: [
            { path: "/login", Component: Login },
            { path: "/register", Component: Register }
        ]
    }
]);

export default router;