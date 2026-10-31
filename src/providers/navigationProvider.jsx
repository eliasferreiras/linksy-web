import { useNavigate } from "react-router-dom";

export default function navigationProvider() {
    const navigate = useNavigate();

    function navigateToLogin() {
        navigate("/login");
    }

    function navigateToRegister() {
        navigate("/register");
    }

    return { navigateToLogin, navigateToRegister };
}

