"use client"

import { usePopUp } from "../_context/PopUpContext";

export default function PopUp() {
  const { popUp, setPopUp } = usePopUp();

  if (!popUp.isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[999123] flex items-center justify-center bg-black/30 backdrop-blur-sm p-2" 
      onClick={() => setPopUp({ ...popUp, isVisible: false })}
    >
      {/* - max-h-[90vh]: لضمان عدم خروج النافذة عن الشاشة طولياً
          - w-full: لتأخذ كامل العرض المتاح في الشاشات الصغيرة جداً
          - max-w-125: الحد الأقصى للشاشات الكبيرة
      */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl transition-all flex flex-col
                   p-4 sm:p-6 md:p-10" /* Padding متدرج حسب حجم الشاشة */
      >
        
        {/* المحتوى النصي */}
        <div className="mb-6">
          <h3 className="font-bold leading-tight text-gray-900 
                         text-[14px] sm:text-base md:text-lg"> 
            {/* حجم خط ديناميكي يبدأ من 14px للشاشات الصغيرة جداً */}
            {popUp.ask}
          </h3>
          
          <div className="mt-3">
            <p className="text-gray-600 leading-relaxed 
                          text-[11px] sm:text-sm">
              {popUp.askDtls}
            </p>
          </div>
        </div>

        {/* الأزرار - استخدام flex-wrap للتعامل مع الشاشات الضيقة جداً */}
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 mt-auto">
          <button  
            onClick={() => setPopUp({isVisible: false, isContinue: false, ask: '', askDtls: '', target: 'logout'})} 
            type="button" 
            className="flex-1 sm:flex-none min-w-[60px] justify-center rounded-lg bg-white px-3 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-medium text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all"
          >
            Cancel
          </button>
          
          <button  
            onClick={() => setPopUp({isVisible: false, isContinue: true, ask: '', askDtls: '', target: 'logout'})} 
            type="button" 
            className="flex-1 sm:flex-none min-w-[60px] justify-center rounded-lg bg-blue-600 px-3 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-medium text-white hover:bg-blue-700 transition-all shadow-sm cursor-pointer"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}