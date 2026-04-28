// _context/PopUpContext.js
"use client";
import PopUp from "../_components/PopUp";
import { createContext, useState, useContext } from "react";

const PopUpCTX = createContext();

export function PopUpProvider({ children }) {
  const [popUp, setPopUp] = useState({
    isVisible: false,
    ask: "",
    askDtls: "",
    onConfirm: null, // هنخزن الدالة هنا
  });

  const showPopUp = (ask, askDtls, onConfirm) => {
    setPopUp({ isVisible: true, ask, askDtls, onConfirm });
  };

  const closePopUp = () => {
    setPopUp({ isVisible: false, ask: "", askDtls: "", onConfirm: null });
  };

  return (
    <PopUpCTX.Provider value={{ showPopUp, closePopUp, popUp }}>
      {children}
      {popUp.isVisible && <PopUp />}
      
    </PopUpCTX.Provider>
  );
}

export const usePopUp = () => useContext(PopUpCTX);