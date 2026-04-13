"use client";
import Link from "next/link";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingBag2Line } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoutBtn from "./LogoutBtn";
import CategoriesSelect from "./CategoriesSelect";

export default function Navbar() {
  const pathname = usePathname();
  const { data: userInfo, status: userStatus } = useSession();

  return (
    <>
      <div className="h-20 w-full"></div>
      <nav className="p-2 grid grid-rows-1 grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center  gap-x-8 shadow-sm px-[2%] py-5 fixed top-0 z-999 bg-white w-full">
        {/*         logo                                                */}
        <Link href="/" className=" flex items-center gap-1">
          <Image
            src="/don.jpeg"
            alt="website logo"
            width={50}
            height={20}
            className="w-10 h-10 rounded-xl max-[190px]:w-6 max-[190px]:h-6 max-[190px]:rounded-xs"
          />
          <span className="max-[190px]:text-sm font-semibold tracking text-2xl">Siuuu</span>
        </Link>

        {/*         Categories & search                                 */}
        <section className="hidden gap-5 items-center sm:flex ">
          <CategoriesSelect />
          {/*         Search                                              */}
          <div className="relative border-2 rounded-3xl w-full">
            <input
              type="text"
              placeholder="search..."
              className="rounded-3xl px-2 py-1 "
            />
            <CiSearch className="absolute  right-2 top-[50%] translate-y-[-50%]" />
          </div>
        </section>

        {/*         User items                                           */}
        <section className="flex gap-4 items-center justify-end   ">
          {userStatus === "authenticated" ? (
            <div className="hidden min-[370px]:flex items-center  gap-x-1">
              <Link
                prefetch={false}
                className="capitalize pt-0.5"
                href="/my-account"
              >
                {userInfo?.user?.name?.slice(0, 5)}
              </Link>
              <LogoutBtn textValue={false} />
            </div>
          ) : (
            <Link
              prefetch={false}
              href={
                pathname === "/login"
                  ? "/register"
                  : pathname === "register"
                    ? "/login"
                    : "/my-account"
              }
              className="hidden min-w-max  capitalize min-[370px]:block tracking-wide"
            >
              {pathname === "/login" ? "register" : "sign in"}
            </Link>
          )}

          <div className="relative ml-2 max-[200px]:hidden">
            <FaRegHeart className="text-md sm:text-2xl " />
            <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] "></span>
          </div>
          <div className="relative max-[200px]:hidden">
            <RiShoppingBag2Line className="text-md sm:text-2xl" />
            <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] "></span>
          </div>
          <FaBars />
        </section>
      </nav>
    </>
  );
}
