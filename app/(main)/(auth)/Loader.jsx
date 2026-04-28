"use client";
import { useEffect, useState } from "react";

export default function Loader({ cancelOperation }) {
  const [showCancelBtn, setShowCancelBtn] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setShowCancelBtn(true);
    }, 100);
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-999999 w-full h-full bg-blue-200/40 flex flex-col gap-2 items-center justify-center cursor-wait pointer-events-auto">
      <div className="w-20 h-20 rounded-full border-5 border-t-blue-500 rotate-360 animate-spin"></div>
      {cancelOperation && showCancelBtn && (
        <button
          type="button"
          onClick={cancelOperation}
          className="fixed top-5 right-5 z-50 text-xs  bg-white  text-red-600 px-2 py-2 rounded-xl hover:border transition-colors font-bold cursor-pointer"
        >
          إلغاء العملية
        </button>
      )}
    </div>
  );
}
