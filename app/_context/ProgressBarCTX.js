"use client"
import { createContext, useContext, useMemo, useState } from "react";

const ProgressBarCTX = createContext();


export default function ProgressBarProvider({children}) {

    const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);

    const value = useMemo(()=>( {isProgressBarVisible, setIsProgressBarVisible} ), [isProgressBarVisible])

    return (
        <ProgressBarCTX.Provider value={value} >
            {children}
        </ProgressBarCTX.Provider>
    )
}

export function useProgressBar(){ 
    const context = useContext(ProgressBarCTX)
    if (!context){throw new Error('Progress Bar Context Must Be Called Inside Progress Bar Provider')}
    return context
};