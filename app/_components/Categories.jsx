"use client";
import Image from "next/image";
import Link from "next/link";
import useCategories from "./FetchCategories";

export default function Categories() {
  const {categories, isLoading,} =  useCategories();

  return (
    <section className="mx-[2%] flex flex-col gap-y-6 rounded-2xl p-4 mb-5">
      <h4 className="font-medium sm:text-3xl max-[160px]:text-[10px]  text-sm">
        Browse by Category
      </h4>

      <div className="noScrollBar flex overflow-x-auto gap-5 sm:gap-15 md:gap-x-20 shadow-sm shadow-sky-100 rounded-2xl p-3">
        {categories?.length > 0 
          ? categories?.map((category) => (
              <Link
                href={`/categories/${category?.name}`}
                key={category._id}
                className="gird grid-cols-1 grid-rows-[48px_auto]   cursor-pointer hover:text-blue-600"
              >
                <div className="relative w-20 h-20 mx-auto overflow-hidden sm:w-30 sm:h-30  rounded-[50%] flex items-center justify-center bg-white mb-4">
                  <Image
                    src={category?.image || "/don.jpeg"}
                    alt={category?.nickName}
                    fill
                    className="object-contain  rounded-sm"
                    sizes="50"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-xs sm:text-sm md:text-xl ">
                  {category?.nickName}
                </p>
              </Link>
            ))
          : isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border w-20 h-20 rounded-[50%] sm:w-30 sm:h-30 flex flex-col justify-around items-center shrink-0"
                >
                  <div className="w-5 h-5 rounded-[50%] border-2 border-t-blue-500 rotate-360 animate-spin "></div>
                </div>
              ))
            : "can't get categories or no categoris found!"}
      </div>
    </section>
  );
}
