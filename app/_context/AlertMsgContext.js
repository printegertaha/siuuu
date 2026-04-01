"use client"

import { createContext, useContext, useState } from "react" ;
 

const AlertMsgCTX = createContext()

export function AlertMsgProvider ({children}) {
    const [alert, setAlert] = useState({isVisible: false, meesage: '', isSuccess: ''});
    return(
        <AlertMsgCTX.Provider value={{alert, setAlert}}>
            {children}
        </AlertMsgCTX.Provider>
    )
}

export function useAlertMsg (){
    const alertContext = useContext(AlertMsgCTX);
    if (!alertContext){throw new Error('Alert Message Context Must Be Called Inside Alert Message Provider !')}
    return alertContext;
}