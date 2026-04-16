"use client";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import CategoriesSelect from "./CategoriesSelect";
import { useState } from "react";
import SideBar from "./SideBar";
import { Bell, Heart, ShoppingBag } from "lucide-react";
import CartSm from "./CartSm";

export default function Navbar() {
  const pathname = usePathname();
  const { data: userInfo, status: userStatus } = useSession();
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);

  return (
    <>
      <div className="h-20 w-full"></div>
      <nav
        onClick={() => {
          isSideBarVisible && setIsSideBarVisible(false);
          isCartVisible && setIsCartVisible(false);
        }}
        className="p-2 grid grid-rows-1 grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center  gap-x-8 shadow-sm px-[2%] py-5 fixed top-0 z-999 bg-white w-full"
      >
        {/*         logo                                                */}
        <Link href="/" className=" flex items-center gap-1">
          <Image
            src="/don.jpeg"
            alt="website logo"
            width={50}
            height={20}
            className="w-10 h-10 rounded-xl max-[190px]:w-6 max-[190px]:h-6 max-[190px]:rounded-xs"
          />
          <span className="max-[190px]:text-sm font-semibold tracking text-2xl">
            Siuuu
          </span>
        </Link>

        {/*         Categories & search                                 */}
        <section className="hidden gap-5 items-center sm:flex ">
          <CategoriesSelect />
          {/*         Search                                              */}
          <div className="relative border-2 rounded-3xl w-full"dir="rtl">
            <input
              type="text"
              placeholder="لسه مش شغال"
              className="rounded-3xl px-2 py-1 "
            />
            <CiSearch className="absolute  left-2 top-[50%] translate-y-[-50%]" />
          </div>
        </section>

        {/*         User items                                           */}
        <section className="flex gap-4 items-center justify-end   ">
          {userStatus === "authenticated" ? (
            <div className="hidden min-[315px]:flex items-center  gap-x-1">
              <Link
                prefetch={false}
                className="capitalize pt-0.5"
                href="/my-account"
              >
                {userInfo?.user?.name?.slice(0, 5)}
              </Link>
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
              className="hidden min-w-max  capitalize min-[315px]:block tracking-wide"
            >
              {pathname === "/login" ? "register" : "sign in"}
            </Link>
          )}

          <div
            className="hidden relative ml-2 max-[370px]:hidden cursor-pointer "
            title="favorites"
          >
            <Heart size={16} className="text-md sm:text-2xl " />
            <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] "></span>{" "}
          </div>
          <div
            className="relative max-[250px]:hidden"
            onClick={() => setIsCartVisible((pre) => !pre)}
          >
            <button className="relative hover:bg-gray-200 w-8 h-8 rounded-[50%] flex items-center justify-center cursor-pointer">
              <ShoppingBag
                size={16}
                className="text-md sm:text-2xl "
                title="cart"
              />
              {/* <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] "></span>{" "} */}
            </button>
          </div>
          <div className="hidden relative max-[220px]:hidden">
            <Bell
              size={16}
              className="text-md sm:text-2xl cursor-pointer"
              title="Notifications"
            />
            {1 === 2 && (
              <span className="absolute -top-1 -right-1 sm:-top-0.5 sm:-right-0.5 bg-red-500 w-2 h-2 sm:w-2 sm:h-2 rounded-[50%] "></span>
            )}{" "}
          </div>

          <button
            type="button"
            onClick={() => setIsSideBarVisible((pre) => !pre)}
            className="hover:bg-gray-200 w-8 h-8 rounded-[50%] flex items-center justify-center cursor-pointer"
          >
            <FaBars />
          </button>
        </section>
      </nav>
      <SideBar
        isVisible={isSideBarVisible}
        setIsVisible={setIsSideBarVisible}
      />
      <CartSm isVisible={isCartVisible} setIsVisible={setIsCartVisible} />
    </>
  );
}
