import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false);
    }, []);

    const loginUser = ({ user, token }) => {
        setUser(user);
        setToken(token);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

