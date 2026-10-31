import { createContext, useContext, useState } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // const [token, setToken] = useState(() => {
    //     const storedToken = localStorage.getItem("token");
    //     return storedToken ? storedToken : null;
    // });

    const isAuthenticated = !!user;

    function login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
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