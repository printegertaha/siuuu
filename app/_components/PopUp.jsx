"use client";
import { usePopUp } from "../_context/PopUpContext";

export default function PopUp() {
  const { popUp, closePopUp } = usePopUp();

  return (
    <div dir="rtl" className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-2">
      <div className="bg-white p-6 rounded-2xl max-w-[500px] w-full shadow-2xl">
        <h3 className="font-bold text-lg">{popUp.ask}</h3>
        <p className="text-gray-600 mt-2">{popUp.askDtls}</p>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={closePopUp} className="border border-gray-300 p-2 rounded-lg cursor-pointer">
            خلاص لأ
          </button>
          <button
            onClick={() => {
              popUp.onConfirm(); // تنفيذ العملية (Logout مثلاً)
              closePopUp(); // قفل المودال
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>
  );
}
