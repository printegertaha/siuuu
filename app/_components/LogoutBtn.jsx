"use client";

// _components/LogoutBtn.js
"use client";
import { signOut } from "next-auth/react";
import { usePopUp } from "../_context/PopUpContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../(main)/(auth)/Loader";

export default function LogoutBtn({ iconValue, textValue = true }) {
  const { showPopUp } = usePopUp();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // دالة تسجيل الخروج الفعلية
  async function logoutHandler() {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  function handleBtnClick() {
    // كل اللي بنعمله بننادي الـ Popup ونبعتله الدالة
    showPopUp(
      "متأكد هتسجل خروج؟",
      "هـنحذف جلستك الحالية وهتحتاج تسجل دخول تاني.",
      logoutHandler, // بنمرر الدالة كـ مرجع (Reference)
    );
  }
  useEffect(() => {
    const x = setInterval(() => {
      console.log("logout btn component is running: " + isLoading);
    }, 500);

    return () => clearInterval(x);
  }, []);

  return (
    <>
      <button
        className={`text-red-600 transition-all ${iconValue && textValue ? "flex gap-2 items-center " : ""} ${isLoading ? "opacity-50 cursor-wait text-red-950" : "cursor-pointer hover:text-red-700"}`}
        disabled={isLoading}
        onClick={handleBtnClick}
      >
        {iconValue && (
          <Power
            className={`${isLoading ? "opacity-70" : ""}  w-4 h-4 text-red-600`}
          />
        )}

        {textValue && <span>{isLoading ? "Logging out..." : "Logout"}</span>}
      </button>
      {isLoading && <Loader />}
    </>
  );
}
