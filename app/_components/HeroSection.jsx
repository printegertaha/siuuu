"use client"
import Image from "next/image";
import { ads, advantages, topSale } from "../data"
import Link from "next/link"
import { useEffect, useRef } from "react";
export default function AdsSlider() {
  const sliderRef = useRef(null);


  // dots
  

  // auto scroll
  useEffect(()=> {
    const sliderBox = sliderRef?.current;

    if (!sliderBox) return ;
    
    const sliderInterval = setInterval(()=> {

      const {scrollLeft, scrollWidth, clientWidth} = sliderRef.current;

      if (scrollLeft >= scrollWidth - clientWidth){
        sliderBox.scrollTo({
          left: 0, 
          behavior: 'smooth'
        })
      }

      else{
        sliderBox.scrollBy({
          left: clientWidth ,
          behavior: 'smooth'
        })
      }
    }, 5000)


    return ()=> clearInterval(sliderInterval)
  }, [])

   


  return (
    <main  className={`grid 
      grid-rows-[220px] grid-cols-1
      sm:grid-rows-[250px_200px_auto] sm:grid-cols-2
      md:grid-rows-[250px_200px_auto] md:grid-cols-2
      lg:grid-rows-[300px_auto] lg:grid-cols-[2fr_1fr]
      xl:grid-rows-[400px_auto] xl:grid-cols-[2fr_1fr]
      gap-4 my-5 px-[2%]
      
    `}>
      <section className="w-full sm:row-span-1 sm:col-span-2 lg:col-span-1  overflow-hidden  rounded-2xl relative ">
        
        <div className=" adsSlider flex gap-4 h-full overflow-x-auto snap-x snap-mandatory scroll-smooth noScrollBar" ref={sliderRef}>
          {ads.map(ad => (
            <div
              key={ad.id}
              className="relative sm:row-end-2 sm:col-span-2 min-w-full h-full snap-start  overflow-hidden"
            >
              <Image
                src={ad.img}
                alt={ad.title}
                fill
                sizes="100%"
                style={{ objectFit: 'cover' }}
                className="object-cover object-bottom z-0 rounded-xl "
                priority
              />
              <div className="max-w-[45%] h-full grid grid-rows-[auto_auto_1fr_auto] gap-y-2 sm:gap-7  pb-10 absolute  top-5 left-5 sm:left-12.5 text-white">
                <span className="uppercase max-[333px]:text-[10px] w-max">{ad.saleName}</span>
                <h3 className="font-black sm:text-3xl max-[333px]:text-xs truncate">{ad.title}</h3>
                <p className="text-xs capitalize max-[333px]:text-[10px] line-clamp-4 overflow-hidden h-fit ">{ad.description}</p>
                <Link href={`/products/${ad.id}`} className="bg-blue-800  px-8 py-2 rounded-3xl capitalize w-max max-[375px]:text-xs max-[375px]:px-3">shop now</Link>
              </div>
            </div>
          ))}

          <div className="hidden sm:flex absolute bottom-5  left-1/2 -translate-x-1/2 z-10 gap-2" >
                {ads.map((_, idx)=> <span key={idx} className={`h-2 w-2 bg-white rounded-[50%]`}></span>)}
          </div>
      </div>


      </section>

      <section className="hidden sm:flex sm:row-start-2 sm:col-span-2 sm:flex-row lg:row-start-1 lg:col-start-2 lg:flex-col gap-3 ">
        {topSale.map(product => (
          <div key={product.id} className="lg:h-[50%] w-full sm:h-full flex gap-2 nth-[1]:bg-[#d7ebf2] nth-[2]:bg-[#eae7de] rounded-2xl ">
            <div className="w-[70%] flex flex-col justify-between p-7">
              <h3 className="font-bold  xl:text-xl tracking-[1px] capitalize "><Link href={`/products/${product.title.replaceAll(' ', '-')}`} className="hover:text-blue-700">{product.title}</Link></h3>
              <p>save up to <span className="text-blue-600 font-bold capitalize">${product.saleValue}</span></p>
            </div>
            <div className="relative flex items-center w-[50%] ">
              <Image src={product.img} alt={product.title} fill sizes="100%" style={{ objectFit: 'cover' }} className="object-contain rounded-xl" />
             
            </div> 
        </div>))}
      </section>

      <section className="hidden sm:flex flex-nowrap row-start-3 col-span-2 lg:row-start-2    gap-x-22  px-5 my-10 overflow-x-auto rounded-2xl shadow py-5  noScrollBar ">
          {advantages.map((item)=> 
          <div key={item.id} className="grid shrink-0 grid-rows-[22px_22px] grid-cols-[50px_auto] items-center gap-x1">
            <Image src={item.img} alt={item.title} width={40} height={40} className="row-span-2 "/>
            <h6 className="col-start-2">{item.title}</h6>
            <p className="col-start-2 text-gray-500">{item.description}</p>
          </div>)}
      </section>


    </main>
  )
}
