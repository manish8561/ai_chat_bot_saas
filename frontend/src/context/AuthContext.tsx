import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

type User = {
    name: string;
    email: string;
    role: string;
};
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    //
    useEffect(() => {
        // from cookie 
        (async function () {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name, role: data.role });
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        }());
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email, name: data.name, role: 'user' });
            setIsLoggedIn(true);
        }
    };
    const register = async (name: string, email: string, password: string) => { };
    const logout = async () => { };

    const value = {
        user,
        isLoggedIn,
        login,
        register,
        logout,

    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);