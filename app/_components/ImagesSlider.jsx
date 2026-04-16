"use client";

import { useEffect, useState, useRef } from "react";
import Image from 'next/image'

export default function ImagesSlider({images= []}) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // عرض تلقائي للصورة حسب الرقم الحالي
  useEffect(() => {
    const sliderBox = sliderRef?.current;
    if (!sliderBox) return;

    const autoScroll = setInterval(() => {
      const { scrollLeft, scrollWidth, offsetWidth } = sliderRef.current;

      if (Math.ceil(scrollLeft + offsetWidth + 10 >= scrollWidth)) {
        sliderBox.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        sliderBox.scrollBy({
          left: offsetWidth,
        });
      }
    }, 5000 );
    return () => clearInterval(autoScroll);
  }, []);

  // تحديث تلقائي لرقم الصورة الحالية
  function imagesScrollHandler() {
    if (sliderRef.current) {
      const { scrollLeft, offsetWidth } = sliderRef.current;
      setCurrentIndex(Math.round(scrollLeft / offsetWidth));
    }
  }
  return (
    <div
      className=" imagesSlider flex  h-full overflow-x-auto snap-x snap-mandatory scroll-smooth noScrollBar"
      ref={sliderRef}
      onScroll={imagesScrollHandler}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {images?.map((img, idx) => (
        <div
          key={idx}
          className="relative shrink-0 w-full sm:row-end-2 sm:col-span-2 min-w-full h-full snap-start  overflow-hidden"
        >
          <Image
            src={img?.img || img}
            alt={img?.brand || 'image'}
            fill
            sizes="100%"
            className="object-fill  z-0 rounded-xl  "
            priority={idx=== 0}
          />
        </div>
      ))}

      {/* زراير ل أنهي صورة اللي معروضة */}
      <div className="flex absolute bottom-2.5  left-1/2 -translate-x-1/2 z-1 gap-2">
        {images?.map((_, idx) => (
          <button
            type="button"
            key={idx}
            className={`transition-all duration-100 h-2 w-2 sm:h-3 sm:w-3 rounded-full cursor-pointer ${
              currentIndex === idx ? "bg-blue-800 w-4 sm:w-6" : "bg-white/50 "
            }`}
            onClick={() => {
              sliderRef?.current?.scrollTo({
                left: idx * sliderRef.current.offsetWidth,
                behavior: "smooth",
              });
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}
