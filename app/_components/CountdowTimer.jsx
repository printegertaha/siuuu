"use client"
import { useState, useEffect } from "react";



export default function OfferTime() {

  //const targetDate = new Date("2026-3-10").getTime(); // 1
  const targetDate = new Date("2026-04-13").getTime(); 


  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      const seconds = Math.floor(diff / 1000 % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / 1000/ 60 / 60 ) % 60 );
      const days = Math.floor(diff / 1000 / 60 / 60 / 24) ;

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-nowrap  flex-col gap-5  bg-sky-100 rounded-3xl mx-[2%] py-8 px-[5%] ">
      <span className="text-blue-700 font-semibold">Do Not Miss!!</span>
      <span className="font-bold tracking-[1px]">Enhance Your Music Experience</span>
      <p >iphone 16 Pro Max</p>
      <div className="flex flex-wrap justify-start items-center gap-1 sm:gap-8 ">
        <div className=" flex flex-col gap-2 justify-center items-center p-1 sm:px-3 ">
          <span className="text-center w-12 h-12 sm:text-xl sm:h-15 sm:w-15  flex items-center justify-center  bg-white text-black text-2xl font-bold rounded-[50%]">{time.days}</span>
          <span className="flex items-center ">D</span></div>
        <div className=" flex flex-col gap-2 justify-center items-center p-1 sm:px-3 " >
          <span className="text-center w-12 h-12 sm:text-xl sm:h-15 sm:w-15  flex items-center justify-center  bg-white text-black text-2xl font-bold rounded-[50%]">{time.hours}</span>
          <span className="flex items-center ">H</span></div>
        <div className=" flex flex-col gap-2 justify-center items-center sm:px-3 p-1 ">
          <span className="text-center w-12 h-12 sm:text-xl sm:h-15 sm:w-15  flex items-center justify-center  bg-white text-black text-2xl font-bold rounded-[50%]">{time.minutes}</span>
          <span className="flex items-center ">M</span></div>
        <div className=" flex flex-col gap-2 justify-center items-center sm:px-3 p-1 ">
            <span className="text-center w-12 h-12 sm:text-xl sm:h-15 sm:w-15  flex items-center justify-center  bg-white text-black text-2xl font-bold rounded-[50%]">{time.seconds}</span>
            <span className=" flex items-center ">S</span>
        </div>
        </div>
      </div>
  )
}
