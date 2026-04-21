"use client";

import LogoutBtn from "@/app/_components/LogoutBtn";
import PathLink from "@/app/_components/PathLink";
import { LogOutIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaProductHunt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function MyAccount() {
  const { data: userInfo } = useSession();

  return (
    // الحاوية الرئيسية - لون خلفية فاتح جداً لتبرز الكروت البيضاء
    <div className="min-h-[calc(100dvh-80px)] bg-[#fafafa] p-2 sm:p-6 md:p-12 font-sans text-gray-900">
      <div className="animate-in fade-in duration-300">
        <p className="text-[12px] sm:text-base text-gray-700 mb-6 leading-relaxed">
          Hello{" "}
          <span className="font-bold text-gray-900">
            {userInfo?.user?.name}
          </span>{" "}
          (not {userInfo?.user?.name} ? <LogoutBtn iconValue={false} />)
        </p>

        <p className="text-[11px] sm:text-sm text-gray-500 leading-loose max-w-3xl">
          From your account dashboard you can view your recent orders, manage
          your shipping and billing addresses, and edit your password and
          account details.
        </p>
      </div>
    </div>
  );
}
