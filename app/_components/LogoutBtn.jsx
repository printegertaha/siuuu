"use client"

import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useAlertMsg } from "../_context/AlertMsgContext";
import { useEffect, useState } from "react";
import { usePopUp } from "../_context/PopUpContext";
import { useProgressBar } from "../_context/ProgressBarCTX";
import { Power } from "lucide-react";

export default function LogoutBtn({textValue=true, iconValue=true}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const {  setAlert } = useAlertMsg();
  const {popUp, setPopUp} = usePopUp();
  const {setIsProgressBarVisible} = useProgressBar();

  // دي داله بتشتغل لما نعمل تسجيل خروج وتأكيد لازم
  async function signOutHandler () {
      if (popUp.isContinue){
      try {
        setIsLoading(true);

        await signOut({ redirect: false });
        
        router.refresh();
        setTimeout(()=>{
          router.replace('/');
        },100)
        
      } catch (err) {
        setAlert({ isVisible: true, isSuccess: false, message: err.message });
        setIsLoading(false); // بنرجع الزرار يشتغل تاني لو حصل خطأ عشان يحاول مرة تانية
      } finally {
        setPopUp({isVisible: false, target: '', isContinue: false, ask: '', answer: ''})
      }
    }
  }

  // تشغيل دالة تسجيل الخروج عند تأكيد تسجيل الخروج فقط
  useEffect(()=> {
    async function handleLogout () {
      if (popUp.isContinue && popUp.target === 'logout'){
        console.log(popUp)
        await signOutHandler();
      }
    }
    handleLogout();
  }, [popUp.isContinue, popUp.target])

  // اظهار رساله لتأكيد تسجيل الخروج
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
    className={`text-red-600 transition-all ${iconValue && textValue ? 'flex gap-2 items-center w-full' : ''} ${isLoading ? 'opacity-50 cursor-wait text-red-950' : 'cursor-pointer hover:text-red-700'}`} 
    disabled={isLoading}
    onClick={logoutHandler} 
  >
    {iconValue && (
      <Power className={`${isLoading ? "opacity-70" : ""} text-black w-4 h-4`} /> 
    )}

    {textValue && (
      <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
    )}
  </button>
  )
}