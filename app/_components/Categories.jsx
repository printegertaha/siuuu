"use client"
import Image from "next/image";
import { CategoriesData } from "../data";
import Link from "next/link";

export default function Categories() {
  return (
    <div>
      
      <section className="px-[2%] flex flex-col gap-y-6">
        <h4 className="font-medium text-3xl">Browse by Category</h4>

        <div className="categoriesSlider flex overflow-x-auto gap-x-30 mx-[5%] ">
            {CategoriesData.map(category =>
                <Link href={`categories/${category?.title?.toLowerCase()?.replaceAll(' & ', '--').replaceAll(' ', '-')}`} key={category.id} className="flex flex-col items-center justify-center gap-y-4 p-2 cursor-pointer hover:text-blue-600" >
                    <div className="w-30 h-30  rounded-[50%] flex items-center justify-center bg-gray-100">
                    <   Image src={category.img} alt={category.title} width={50} height={50} className="w-17 h-14"/>
                </div>
                <h6 className="text-center">{category.title}</h6>
            </Link>)}
        </div>

      </section>

              
    </div>
  )
}
