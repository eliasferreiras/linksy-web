import { createContext, useContext, useState, useEffect } from "react";
import { setUnauthorizedHandler } from "../providers/requestProvider";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? storedToken : null;
    });

    const isAuthenticated = !!token;

    useEffect(() => {
        setUnauthorizedHandler(logout)

        return () => {
            setUnauthorizedHandler(() => {})
        }
    }, [])

    function login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        setUser(userData);
        setToken(userData.token);
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    return (
        <SessionContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}