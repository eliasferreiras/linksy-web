import { Navigate, Outlet } from 'react-router-dom';
import { useSession } from "../contexts/SessionContext";

function ProtectedRoute() {
    const { isAuthenticated } = useSession();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
