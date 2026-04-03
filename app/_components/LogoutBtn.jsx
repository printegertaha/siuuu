"use client"

import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useAlertMsg } from "../_context/AlertMsgContext";
import { useEffect, useState } from "react";
import { usePopUp } from "../_context/PopUpContext";

export default function LogoutBtn({textValue = 'Log out'}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const { setAlert } = useAlertMsg();
  const {popUp, setPopUp} = usePopUp()

  async function signOutHandler () {
      if (popUp.isContinue){
      try {
        setIsLoading(true);
        // لازم await عشان ننتظر الرد من السيرفر
        await signOut({ redirect: false });
        
        setAlert({ isVisible: true, message: 'Success logout', isSuccess: true });
        
        // بنعمل refresh الأول عشان نحدث حالة الـ Session في كل المكونات
        router.refresh();
        router.replace('/');
        
      } catch (err) {
        setAlert({ isVisible: true, isSuccess: false, message: err.message });
        setIsLoading(false); // بنرجع الزرار يشتغل تاني لو حصل خطأ عشان يحاول مرة تانية
      } finally {
        setPopUp({isVisible: false, target: '', isContinue: false, ask: '', answer: ''})
      }
    }
  }

  useEffect(()=> {
    if (popUp.isContinue, popUp.target === 'logout'){
      signOutHandler()
    }
  }, [popUp.isContinue, popUp.target])

  async function logoutHandler() {
    if (isLoading) return;
    setPopUp({
      isVisible: true, 
      ask: 'are you sure you want to log out ?', 
      askDtls: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
      isContinue: false,
      target: 'logout'
    });
  }

  return (
    <button 
      className={`text-red-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
      disabled={isLoading} 
      onClick={logoutHandler} 
    >
      {isLoading ? 'Logging out...' : textValue}
    </button>
  )
}