/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { useProgressBar } from "../_context/ProgressBarCTX";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const {isProgressBarVisible, setIsProgressBarVisible} = useProgressBar();
  

  const pathname = usePathname()

  let intervalRef = useRef(null);


  function clearAll(){
    if (intervalRef.current){
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }


  function start () {
    if (!isProgressBarVisible){
      setIsProgressBarVisible(true)
    }
    clearAll();
    setProgress(0)
    let value = 0 ;

    intervalRef.current = setInterval(()=> {
      if (value < 50) value += Math.random() * 20
        else if (value < 80) value += Math.random() * 10
        else if (value < 95) value += Math.random() * 2
        else {clearAll(); value = 95;}
      setProgress(value)
    }, 100)

  }



  function end () {
  clearAll()
  setProgress(100)

  setTimeout(()=>{
    setIsProgressBarVisible(false)
    setProgress(0)
  },300)
}


  // click handler Func
  useEffect(()=> {
    
    function clickHandler (e) {

      if(e.metaKey || e.ctrlKey ||e.shiftKey || e.altKey || e.button !== 0) return

      // لو ضغطت على عنصر هوا او ابوه او جدوده مش لينك الغي
      const link = e.target.closest('a');  

      if (!link) return      
      
      const url = new URL(link.href);

      if (url.origin !== window.location.origin) return 

      start()


      if (url.href === window.location.href){
        setTimeout(()=> {
          end()
        }, 300)
      }

    }

    document.addEventListener('click', clickHandler);
    return ()=> document.removeEventListener('click', clickHandler)
  }, [])


  // Call End Func
  useEffect(()=> {
      end()
  }, [pathname])

  // بنشغل الداله لو اشتغلت من غير او بكليك على لينك
  useEffect(()=>{
    if(isProgressBarVisible){
      start();
    }
  },[isProgressBarVisible])



  return isProgressBarVisible && <div className="h-0.5 w-screen fixed top-0  z-2002 ">
        <div
          className="h-full bg-blue-600 transition-[width] duration-300 ease"
          style={{ width: `${progress}%` }}
        />
      </div> 
  

}


