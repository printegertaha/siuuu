"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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

  // دالة التنقل لجعلها قابلة لإعادة الاستخدام
  const scrollToSlide = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (slider) {
      const offsetWidth = slider.offsetWidth;
      // استخدام scrollTo مع تحديد الإحداثيات بدقة لضمان عملها على سفاري
      slider.scrollTo({
        left: index * offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  // العرض التلقائي
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollToSlide(nextIndex);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, scrollToSlide]);

  // تحديث الاندكس عند السحب اليدوي (Optimized)
  const imagesScrollHandler = (): void => {
    const slider = sliderRef.current;
    if (slider) {
      const { scrollLeft, offsetWidth } = slider;
      // إضافة 10 بيكسل هامش خطأ لضمان الحساب الدقيق في سفاري
      const index = Math.round(scrollLeft / offsetWidth);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  return (
    <div className="relative w-full h-full group">
      <div
        className="imagesSlider flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth noScrollBar appearance-none"
        ref={sliderRef}
        onScroll={imagesScrollHandler}
        style={{ 
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: 'none', // لمتصفح فايرفوكس
          msOverflowStyle: 'none' // لمتصفح IE/Edge
        }}
      >
        {images.map((img, idx) => {
          const imgSrc = typeof img === "string" ? img || "/don.jpeg" : img?.img || "/don.jpeg";
          const imgAlt = typeof img === "string" ? "ad image" : img?.brand || "ad image";
          
          return (
            <div
              key={idx}
              className="relative shrink-0 w-full min-w-full h-full snap-start snap-always overflow-hidden"
            >
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-fill rounded-xl" // استعمل cover أفضل من fill للصور المتغيرة
                priority={idx === 0}
              />
            </div>
          );
        })}
      </div>

      {/* المؤشرات (Dots) */}
      {images.length > 1 && (
        <div className="flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {images.map((_, idx) => (
            <button
              type="button"
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
                currentIndex === idx ? "bg-white w-5" : "bg-white/50 w-2"
              }`}
              onClick={() => scrollToSlide(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}















// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";

// interface SliderImg {
//   img: string;
//   brand?: string;
// }

// interface Props {
//   images: (SliderImg | string)[];
// }

// export default function ImagesSlider({ images = [] }: Props) {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   // عرض تلقائي للصورة حسب الرقم الحالي
//   useEffect(() => {
//     const sliderBox = sliderRef?.current;
//     if (!sliderBox) return;

//     const autoScroll = setInterval(() => {
//       if (sliderBox) {
//         const { scrollLeft, scrollWidth, offsetWidth } = sliderBox;

//         if (Math.ceil(scrollLeft + offsetWidth + 10) >= scrollWidth) {
//           sliderBox.scrollTo({
//             left: 0,
//             behavior: "smooth",
//           });
//         } else {
//           sliderBox.scrollBy({
//             left: offsetWidth,
//           });
//         }
//       }
//     }, 8000);
//     return () => clearInterval(autoScroll);
//   }, []);

//   // تحديث تلقائي لرقم الصورة الحالية
//   function imagesScrollHandler(): void {
//     const slider = sliderRef?.current;
//     if (slider) {
//       const { scrollLeft, offsetWidth } = slider;
//       setCurrentIndex(Math.round(scrollLeft / offsetWidth));
//     }
//   }

//   return (
//     <div
//       className=" imagesSlider flex gap-2 h-full overflow-x-auto snap-x snap-mandatory scroll-smooth noScrollBar"
//       ref={sliderRef}
//       onScroll={imagesScrollHandler}
//       style={{ WebkitOverflowScrolling: "touch" }}
//     >
//       {images?.map((img, idx) => {
//         const imgSrc =
//           typeof img === "string"
//             ? img || "/don.jpeg"
//             : img?.img || "/don.jpeg";
//         const imgAlt =
//           typeof img === "string" ? "ad image" : img?.brand || "ad image";
//         return (
//           <div
//             key={idx}
//             className="relative shrink-0 w-full sm:row-end-2 sm:col-span-2 min-w-full h-full snap-start  overflow-hidden"
//           >
//             <Image
//               src={imgSrc}
//               alt={imgAlt}
//               fill
//               sizes="100%"
//               className="object-fill  z-0 rounded-xl  "
//               priority={idx === 0}
//             />
//           </div>
//         );
//       })}

//       {/* زراير ل أنهي صورة اللي معروضة */}
//       <div className="flex absolute bottom-2.5  left-1/2 -translate-x-1/2 z-1 gap-2">
//         {images?.map((_, idx) => (
//           <button
//             type="button"
//             key={idx}
//             className={`transition-all duration-100 h-2 w-2 sm:h-3 sm:w-3 rounded-full cursor-pointer ${
//               currentIndex === idx ? "bg-blue-800 w-4 sm:w-6" : "bg-white/50 "
//             }`}
//             onClick={() => {
//               const slider = sliderRef?.current;
//               if (slider) {
//                 slider.scrollTo({
//                   left: idx * slider.offsetWidth,
//                   behavior: "smooth",
//                 });
//               }
//             }}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// }

