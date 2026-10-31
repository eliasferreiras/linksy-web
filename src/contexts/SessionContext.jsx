import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false); //!!user;

    function login() {
        // localStorage.setItem("user", JSON.stringify(userData));
        // setUser(userData);
        setIsAuthenticated(true);
    }

    function logout() {
        // localStorage.removeItem("user");
        // setUser(null);
        setIsAuthenticated(false);
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