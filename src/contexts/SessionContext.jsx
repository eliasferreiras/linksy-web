import { createContext, useContext, useState, useEffect } from "react";
import { setUnauthorizedHandler } from "../providers/requestProvider";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem("accessToken");
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
        const user = {
            name: userData.name,
            username: userData.username,
            roles: userData.roles,
        }

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", userData.token);
        setUser(user);
        setToken(userData.token);
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
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