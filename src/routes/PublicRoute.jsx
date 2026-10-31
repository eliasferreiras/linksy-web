import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

function PublicRoute() {
    const { isAuthenticated } = useSession();

    return isAuthenticated? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;