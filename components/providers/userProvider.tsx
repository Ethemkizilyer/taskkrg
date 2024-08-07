"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
    isUserLogin: boolean;
    setIsUserLogin(value: boolean): void;
    user: any;
    setUser(value: any): void;
};

const UserContext = createContext<UserContextType>({
    isUserLogin: false,
    setIsUserLogin: () => {},
    user: null,
    setUser: () => {},
});

const UserProvider = ({ children }) => {
    const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter()
    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser) {
            setUser(JSON.parse(localUser));
            setIsUserLogin(true);
        }
    }, []);

    const values = {
        isUserLogin,
        setIsUserLogin,
        user,
        setUser,
    };

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
