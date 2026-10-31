import { Routes, Route } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;