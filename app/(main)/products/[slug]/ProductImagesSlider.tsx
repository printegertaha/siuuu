"use client";

import { Heart, Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";

export default function ImagesSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleScroll() {
    const scroll = scrollRef?.current;
    if (scroll) {
      const { scrollLeft, offsetWidth } = scroll;
      const index = Math.round(Math.abs(scrollLeft) / offsetWidth);
      setActiveIndex(index);
    }
  }

  if (isPopupOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="relative group mx-auto max-w-3xl ">
      <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm ">
        {/* اسلايدر الصور */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-75 md:h-112.5 no-scrollbar"
        >
          {images.map((img: string, i: number) => (
            <div
              key={i}
              className="min-w-full h-full snap-center flex items-center justify-center p-2"
            >
              <img
                src={img}
                alt={"ad img"}
                className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>

        {/* زرار تكبير الصور */}
        <div className="absolute top-4 left-4 right-1.5 opacity-50 flex justify-between items-center pointer-events-none">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm pointer-events-auto hover:bg-white transition-all text-gray-700"
          >
            <Maximize2 size={18} />
          </button>
          <button className="p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm pointer-events-auto hover:bg-white transition-all">
            <Heart size={18} className="text-red-500 fill-red-500" />
          </button>
        </div>

        {/* الصور المكبرة  */}
        {isPopupOpen && (
          <section className="fixed  z-10  inset-0 w-dvw  h-dvh bg-black/50 backdrop-blur-md">
            <div className="fixed top-21 left-1/2 -translate-x-1/2 z-100 bg-white/95 flex flex-col items-center justify-center p-4 rounded-xl mx-auto">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute opacity-40 top-6 right-6 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all text-gray-800"
              >
                <X size={24} />
              </button>

              <div className="w-[90vw]  max-w-4xl max-h-[83dvh]  overflow-y-auto no-scrollbar rounded-2xl">
                {images.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full object-contain mb-4 rounded-lg shadow-sm"
                  />
                ))}
              </div>

              <p className="mt-4  text-gray-500 font-medium font-mono text-sm">
                عرض الكل ({images.length} صور)
              </p>
            </div>
          </section>
        )}

        {/* نقط التحكم فوق الصور */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
          {images.map((_: any, i: number) => (
            <div
              key={i}
              className={`transition-all duration-300 rounded-full ${activeIndex === i ? "w-4 h-1.5 bg-blue-600" : "w-1.5 h-1.5 bg-gray-400"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
