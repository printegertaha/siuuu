"use client";
import Image from "next/image";
import { ads, advantages, topSale } from "../data";
import Link from "next/link";
import ImagesSlider from "./ImagesSlider";

export default function HeroSection() {


  return (
    <main
      className={`grid
      grid-rows-[220px] grid-cols-1
      sm:grid-rows-[250px_200px_auto] sm:grid-cols-2
      md:grid-rows-[250px_200px_auto] md:grid-cols-2
      lg:grid-rows-[300px_auto] lg:grid-cols-[2fr_1fr]
      xl:grid-rows-[400px_auto] xl:grid-cols-[2fr_1fr]
      gap-4 my-5 mx-[2%]
      
    `}
    >
      <section className="w-full sm:row-span-1 sm:col-span-2 lg:col-span-1  overflow-hidden  rounded-2xl relative ">
        <ImagesSlider images={ads}/>
      </section>

      {/* الأكثر مبيعا أو منتجين مدفوعلهم */}
      <section className="hidden sm:flex sm:row-start-2 sm:col-span-2 sm:flex-row lg:row-start-1 lg:col-start-2 lg:flex-col gap-3 ">
        {topSale.map((product) => (
          <div
            key={product.id}
            className="lg:h-[50%] w-full sm:h-full flex gap-2 nth-[1]:bg-[#d7ebf2] nth-[2]:bg-[#eae7de] rounded-2xl "
          >
            <div className="w-[70%] flex flex-col justify-between p-7">
              <h3 className="font-bold  xl:text-xl tracking-[1px] capitalize ">
                <Link href={`/`} className="hover:text-blue-700">
                  {product.title}
                </Link>
              </h3>
              <p>
                save up to{" "}
                <span className="text-blue-600 font-bold capitalize">
                  ${product.saleValue}
                </span>
              </p>
            </div>
            <div className="relative flex items-center w-[50%] ">
              <Image
                src={product.img}
                alt={product.title}
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
                className="rounded-xl"
              />
            </div>
          </div>
        ))}
      </section>

      {/* مميزات الموقع */}
      <section className="hidden sm:flex flex-nowrap min-[1277px]:justify-center row-start-3 col-span-2 lg:row-start-2    gap-x-22  px-5 mt-3 overflow-x-auto rounded-2xl shadow py-5  noScrollBar ">
        {advantages.map((item) => (
          <div
            key={item.id}
            className="grid shrink-0 grid-rows-[22px_22px] grid-cols-[50px_auto] items-center gap-x1"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={40}
              height={40}
              className="row-span-2 "
            />
            <h6 className="col-start-2">{item.title}</h6>
            <p className="col-start-2 text-gray-500">{item.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
