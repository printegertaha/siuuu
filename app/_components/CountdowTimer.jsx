"use client"
import { useState, useEffect } from "react";

export default function OfferTime() {

  const targetDate = new Date("2026-3-10").getTime(); // 1


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
      const minutes = Math.floor(diff / 1000 / 60 % 60);
      const hours = Math.floor(diff / 1000/ 60 / 60 % 60 );
      const days = Math.floor(hours / 24);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-nowrap flex-col gap-5  bg-sky-100 rounded-3xl mx-[2%] py-8 px-[5%]">
      <span className="text-blue-700 font-semibold">Do Not Miss!!</span>
      <span className="font-bold tracking-[1px]">Enhance Your Music Experience</span>
      <p >iphone 16 Pro Max</p>
      <div className="flex gap-8">
        <div className=" flex flex-col gap-2 justify-center items-center px-3 py-1">
          <span className="text-center h-15 w-15 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-xl">{time.days}</span>
          <span>Days</span></div>
        <div className=" flex flex-col gap-2 justify-center items-center px-3 py-1">
          <span className="text-center h-15 w-15 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-xl">{time.hours}</span>
          <span>Hours</span></div>
        <div className=" flex flex-col gap-2 justify-center items-center px-3 py-1">
          <span className="text-center h-15 w-15 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-xl">{time.minutes}</span>
          <span>Minutes</span></div>
      <div className=" flex flex-col gap-2 justify-center items-center px-3 py-1">
        <span className="text-center h-15 w-15 flex items-center justify-center bg-white text-black text-2xl font-bold rounded-xl">{time.seconds}</span>
        <span></span>Seconds</div>
      </div>
    </div>

  )
}
