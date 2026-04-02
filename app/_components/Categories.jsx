"use client"
import Image from "next/image";
import { CategoriesData } from "../data";
import Link from "next/link";

export default function Categories() {
  return (      
      <section className="mx-[2%] flex flex-col gap-y-6 rounded-2xl p-4 mb-5">
        <h4 className="font-medium sm:text-3xl max-[160px]:text-[10px]  text-sm">Browse by Category</h4>

        <div className="noScrollBar flex overflow-x-auto gap-5 sm:gap-15 md:gap-x-20 shadow-sm shadow-sky-100 rounded-2xl p-3">
            {CategoriesData.map(category =>
              <Link href={`categories/${category?.title?.toLowerCase()?.replaceAll(' & ', '--').replaceAll(' ', '-')}`} key={category.id} className="gird grid-cols-1 grid-rows-[48px_auto] cursor-pointer hover:text-blue-600" >
                  <div className="w-20 h-20  sm:w-30 sm:h-30  rounded-[50%] flex items-center justify-center bg-gray-200 mb-4">
                    <Image src={category.img} alt={category.title} width={20} height={20} className="w-12 h-12"/>
                  </div>
                  <p className="text-center text-xs sm:text-sm md:text-xl">{category.title}</p>
              </Link>)}
        </div>

      </section>
  )
}
