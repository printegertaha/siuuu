"use client"
import { useEffect } from "react"
import {usePathname, useSearchParams} from 'next/navigation'

export default function SavePrevPath() {

  const pathname = usePathname()
  const searchParams = useSearchParams();
  
  useEffect(()=> {
    if( !(pathname.includes('register') || pathname.includes('login')) ){
      const readySearchParams = searchParams.toString()
      const fullPath = readySearchParams ? `${pathname}?${readySearchParams}` : pathname;
      sessionStorage.setItem('prevPath', fullPath);
    }
  }, [pathname, searchParams])
  return null
}
