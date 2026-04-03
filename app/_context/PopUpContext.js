"use client"

const { createContext, useState, useContext } = require("react");

const PopUpCTX = createContext();

export function PopUpProvider ({children}) {
    const [popUp, setPopUp] = useState({ask: '', askDtls: '', isVisible: false, isContinue: false, target: ''});

    return (
        <PopUpCTX.Provider value={{popUp, setPopUp}}>
            {children}
        </PopUpCTX.Provider>
    )
}

export function usePopUp () {
    const context = useContext(PopUpCTX);
    if (!context){ throw new Error({message: 'Pop Up Context Must Be Called Inside Alert Message Provider !'})}
    return context;
}