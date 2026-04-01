"use client"

import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useAlertMsg } from "../_context/AlertMsgContext";
import { useState } from "react";

export default function LogoutBtn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const { setAlert } = useAlertMsg();

  async function logoutHandler() {
    if (isLoading) return;

    setIsLoading(true);
    console.log('logging out...');

    try {
      // لازم await عشان ننتظر الرد من السيرفر
      await signOut({ redirect: false });
      
      setAlert({ isVisible: true, message: 'Success logout', isSuccess: true });
      
      // بنعمل refresh الأول عشان نحدث حالة الـ Session في كل المكونات
      router.refresh();
      router.replace('/');
      
    } catch (err) {
      setAlert({ isVisible: true, isSuccess: false, message: err.message });
      setIsLoading(false); // بنرجع الزرار يشتغل تاني لو حصل خطأ عشان يحاول مرة تانية
    }
  }

  return (
    <button 
      className={`text-red-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
      disabled={isLoading} 
      onClick={logoutHandler} 
    >
      {isLoading ? 'Logging out...' : 'Log Out'}
    </button>
  )
}