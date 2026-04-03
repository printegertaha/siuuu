"use client"
import Link from 'next/link';
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import {  RiShoppingBag2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { CiLogout, CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from 'react';
import { CategoriesData } from '../data';
import { IoIosArrowUp } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LogoutBtn from './LogoutBtn';



export default function Navbar() {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const  [categoryValue, setCategoryValue] = useState('All Categories')
    const pathname = usePathname();
    const categorySelected = pathname.split('/')[2] || 'All Categories';
    const { data: userInfo, status: userStatus} = useSession()



  return (
    <>
        <div className='h-20 w-full'></div>
        <nav className='p-2 grid grid-rows-1 grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center  gap-x-8 shadow-sm px-[2%] py-5 fixed top-0 z-999 bg-white w-full'>

        {/* 1 */}
            <Link  href='/'  className=' flex items-center gap-1'><Image src='/don.jpeg' alt='website logo' width={50} height={20} className='w-10 h-10 rounded-xl' /><span className='font-semibold tracking text-2xl'>Siuuu</span></Link>

        {/* 2 */}
            <section className='hidden gap-5 items-center sm:flex '>

            {/* categories  */}
            <div className='categoriesSelect relative w-55 hidden min-[915px]:grid grid-cols-[20px_1fr_10px] items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-2xl cursor-pointer z-2' onClick={()=> setIsCategoryOpen(pre => !pre)}>
                <FaBars />
                <span className='w-max px-2'>{pathname.split('/')[1] === 'categories' ? categorySelected?.replaceAll('--', ' & ').replaceAll('-', ' ') : categoryValue}</span>
                <span>{isCategoryOpen ?  <IoIosArrowUp /> : <MdKeyboardArrowDown />}</span>
                {isCategoryOpen && 
                <ul className='absolute top-10  w-55 pl-3 rounded-2xl py-2 bg-gray-50 shadow ' >
                    {CategoriesData.map((category) => <li  key={category.id} onClick={()=>setCategoryValue(category.title)} className='rounded-md m-1 hover:bg-[#e8eefbd9]' style={{background: categoryValue === category.title && '#0112' }}>
                        <Link href={`/categories/${category?.title.toLowerCase().replaceAll(' & ', '--').replaceAll(' ', ('-'))}`} className='block px-2 py-1'>{category.title}</Link></li>)}
                </ul>
                }
            </div>

                {/* input */}
                <div className='relative  border rounded-3xl w-full'>
                    <input type="text" placeholder='search...' className='rounded-3xl px-2 py-1 ' />
                    <CiSearch className='absolute right-2 top-[50%] translate-y-[-50%]'/>
                </div>

            </section>

            {/* 3 */}
            <section className='flex gap-4 items-center justify-end   '>
                
                { userStatus === 'authenticated' 
                    ?
                    <div className='flex items-center gap-x-3'>
                        <Link href='/my-account' className='capitalize' prefetch={false}>{userInfo?.user?.name?.slice(0,5)}</Link>
                        <LogoutBtn textValue={<CiLogout className='text-blue-950' />}/>
                    </div>
                    :
                    <Link href={pathname === '/login' ? '/register' : pathname === 'register' ? '/login': '/my-account'} prefetch={false} className='hidden min-w-max  capitalize min-[350px]:block tracking-wide'>
                        {pathname === '/login' ? 'register' : 'sign in'}
                    </Link>
                }
                
                <div className='relative ml-2 max-[200px]:hidden'>
                    <FaRegHeart className='text-md sm:text-2xl ' />
                    <span className='absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] '></span>
                </div>
                <div className='relative max-[200px]:hidden'>
                    <RiShoppingBag2Line className='text-md sm:text-2xl'/>
                    <span className='absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] '></span>
                </div>
                <FaBars />
            </section>

        

        </nav>
    </>
  )
}
