"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBag2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
import { CategoriesData } from '../data';
import { IoIosArrowUp } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';



export default function Navbar() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const  [categoryValue, setCategoryValue] = useState('All Categories')
    const pathname = usePathname();
    const categorySelected = pathname.split('/')[2] || 'All Categories';
    const {data: userInfo, status: userStatus} = useSession()


  return (
    <>
        <div className='h-20 w-full'></div>
        <nav className='p-2 flex flex-wrap items-center justify-between gap-y-5 gap-x-3 shadow-sm px-[2%] py-5 fixed top-0 z-999 bg-white w-full'>

    {/* 1 */}
        <Link  href='/'  className='flex items-center gap-1'><Image src='/don.jpeg' alt='website logo' width={50} height={20} className='w-10 h-10 rounded-xl' /><span className='font-semibold tracking text-2xl'>Siuuu</span></Link>

    {/* 2 */}
        <section className='flex gap-5 items-center '>

        {/* categories  */}
        <div className='categoriesSelect relative w-55 grid grid-cols-[20px_1fr_10px] items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-2xl cursor-pointer z-2' onClick={()=> setIsCategoryOpen(pre => !pre)}>
            <FaBars />
            <span>{pathname.split('/')[1] === 'categories' ? categorySelected?.replaceAll('--', ' & ').replaceAll('-', ' ') : categoryValue}</span>
            <span>{isCategoryOpen ?  <IoIosArrowUp /> : <MdKeyboardArrowDown />}</span>
            {isCategoryOpen && 
            <ul className='absolute top-10  w-55 pl-3 rounded-2xl py-2 bg-gray-50 shadow ' >
                {CategoriesData.map((category) => <li  key={category.id} onClick={()=>setCategoryValue(category.title)} className='rounded-md m-1 hover:bg-[#e8eefbd9]' style={{background: categoryValue === category.title && '#0112' }}>
                    <Link href={`/categories/${category?.title.toLowerCase().replaceAll(' & ', '--').replaceAll(' ', ('-'))}`} className='block px-2 py-1'>{category.title}</Link></li>)}
            </ul>
            }
        </div>

            {/* input */}
            <div className='relative  border rounded-3xl'>
                <input type="text" placeholder='search...' className='rounded-3xl px-2 py-1 ' />
                <CiSearch className='absolute right-2 top-[50%] translate-y-[-50%]'/>
            </div>

        </section>

        {/* 3 */}
        <section className='flex gap-4 items-center '>
            
            <Link href='/login' className='hidden lg:grid grid-rows-[20px_20px] grid-cols-[30px_1fr] items-center gap-y-0 gap-x-3'>
                <span className='row-span-2 col-start-1 w-9 h-9 border-[.5px] border-black/15 rounded-[50%] flex items-center justify-center'><IoPersonOutline className='text-md'/></span>
                <span className='col-start-2 row-start-1 text-[10px] text-black/80 uppercase'>account</span>
                {userInfo?.user?.name
                    ? <span className='col-start-2 row-start-2 capitalize text-[14px]'>{userInfo?.user?.name?.slice(0,9) + (userInfo?.user?.name?.length > 10 ? '..' : '')}</span>
                    : <span className='col-start-2 row-start-2 capitalize text-[14px]'>sign in / register</span> 
                }
            </Link>
            
            <div className='relative ml-2'>
                <FaRegHeart className='text-2xl ' />
                <span className='absolute -top-1 -right-1 bg-red-600 text-white w-4 h-4 text-xs rounded-[50%] flex items-center justify-center'>0</span>
            </div>
            <div className='relative'>
                <RiShoppingBag2Line className='text-2xl'/>
                <span className='absolute -top-1 -right-1 bg-red-600 text-white w-4 h-4 text-xs rounded-[50%] flex items-center justify-center'>0</span>
            </div>
            <FaBars  className='block lg:hidden'/>
        </section>



        </nav>
    </>
  )
}
