"use client"

import { createContext, useContext, useEffect, useState } from "react"

import { useUser } from "./userContext";
import GetFlags from "@/lib/getFlags";
import GetBoards from "@/lib/getBoards";

type DataContextType = {
    flags: Array<any>
    boards: Array<any>
    setFlags(value: any): void
    setBoards(value: any): void
}

const DataContext = createContext<DataContextType>({
    flags: [],
    boards: [],
    setFlags: () => { },
    setBoards: () => { }
});

const DataProvider = ({ children }) => {
    const [flags, setFlags] = useState([]);
    const [boards, setBoards] = useState([]);

    const { user, isUserLogin } = useUser();
    useEffect(() => {
        (async () => {
            setFlags(await GetFlags(user?.token));
            setBoards(await GetBoards(user?.token))
        })()
    }, [isUserLogin])

    const values = {
        flags,
        boards,
        setFlags,
        setBoards
    }
    return <DataContext.Provider value={values}>
        {children}
    </DataContext.Provider>
}

const useData = () => useContext(DataContext);

export {
    useData,
    DataProvider
}