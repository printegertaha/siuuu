"use client"

import { usePopUp } from "../_context/PopUpContext";

export default function PopUp() {

    const {popUp, setPopUp} = usePopUp();

  return (
    <>
      {popUp.isVisible && 
        <div className="fixed h-screen  inset-0 z-2000 bg-black/30 backdrop-blur-sm" onClick={()=> setPopUp({...popUp, isVisible: false})}>
            
            {/* النافذة البيضاء نفسها (Modal Container) */}
            <div onClick={(e)=> e.stopPropagation()} className="w-[70%] absolute top-1/2 left-1/2 -translate-1/2 max-w-125 transform rounded-2xl bg-white p-10 text-left align-middle shadow-2xl transition-all">
              
              {/* رأس النافذة: العنوان والوصف */}
              <div className="mb-8">
                {/* تصميم العنوان - Are you absolutely sure? */}
                <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-2">
                  {popUp.ask}
                </h3>
                
                {/* تصميم الوصف - This action cannot be undone... */}
                <div className="mt-4">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {popUp.askDtls}
                  </p>
                </div>
              </div>

              {/* الأزرار */}
              <div className="flex items-center justify-end gap-3.5 mt-10">
                <button  onClick={()=> setPopUp({isVisible: false, isContinue: false, ask: '', askDtls: '', target: 'logout'})} type="button" className="inline-flex justify-center rounded-lg  bg-white px-6 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-all">
                  Cancel
                </button>
                <button  onClick={()=> setPopUp({isVisible: false, isContinue: true, ask: '', askDtls: '', target: 'logout'})} type="button" className="inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-6 py-2.5 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all">
                  Continue
                </button>
              </div>

            </div>

        </div>
      }
  </>);
}