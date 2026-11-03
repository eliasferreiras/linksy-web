import { createBrowserRouter } from "react-router";
import Routes from "../enums/routes";

import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "../routes/ProtectedRoute";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        Component: ProtectedRoute,
        children: [
            { path: Routes.HOME, Component: Home }
        ]
    },
    {
        Component: PublicRoute,
        children: [
            { path: Routes.LOGIN, Component: Login },
            { path: Routes.REGISTER, Component: Register }
        ]
    }
]);

export default router;