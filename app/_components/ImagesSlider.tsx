"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface SliderImg {
  img: string;
  brand?: string;
}

interface Props {
  images: (SliderImg | string)[];
}

export default function ImagesSlider({ images = [] }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // عرض تلقائي للصورة حسب الرقم الحالي
  useEffect(() => {
    const sliderBox = sliderRef?.current;
    if (!sliderBox) return;

    const autoScroll = setInterval(() => {
      if (sliderBox) {
        const { scrollLeft, scrollWidth, offsetWidth } = sliderBox;

        if (Math.ceil(scrollLeft + offsetWidth + 10) >= scrollWidth) {
          sliderBox.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          sliderBox.scrollBy({
            left: offsetWidth,
          });
        }
      }
    }, 8000);
    return () => clearInterval(autoScroll);
  }, []);

  // تحديث تلقائي لرقم الصورة الحالية
  function imagesScrollHandler(): void {
    const slider = sliderRef?.current;
    if (slider) {
      const { scrollLeft, offsetWidth } = slider;
      setCurrentIndex(Math.round(scrollLeft / offsetWidth));
    }
  }

  return (
    <div
      className=" imagesSlider flex gap-2 h-full overflow-x-auto snap-x snap-mandatory scroll-smooth noScrollBar"
      ref={sliderRef}
      onScroll={imagesScrollHandler}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {images?.map((img, idx) => {
        const imgSrc =
          typeof img === "string"
            ? img || "/don.jpeg"
            : img?.img || "/don.jpeg";
        const imgAlt =
          typeof img === "string" ? "ad image" : img?.brand || "ad image";
        return (
          <div
            key={idx}
            className="relative shrink-0 w-full sm:row-end-2 sm:col-span-2 min-w-full h-full snap-start  overflow-hidden"
          >
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              sizes="100%"
              className="object-fill  z-0 rounded-xl  "
              priority={idx === 0}
            />
          </div>
        );
      })}

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
              const slider = sliderRef?.current;
              if (slider) {
                slider.scrollTo({
                  left: idx * slider.offsetWidth,
                  behavior: "smooth",
                });
              }
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}
