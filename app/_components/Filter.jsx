"use client";
import { FilterIcon } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Filter() {
  const readOnlySearchParams = useSearchParams();
  const searchParams = new URLSearchParams(readOnlySearchParams.toString()); // page=2&sort=time
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex gap-2 h-fitobject items-center p-2 rounded-md  mx-[2%]">
      <select
        className="outline-none bg-transparent cursor-pointer"
        defaultValue={readOnlySearchParams.get("sort") || "latest"}
        onChange={(e) => {
          searchParams.set("sort", e.target.value);
          replace(`${pathname}?${searchParams}`);
        }}
      >
        <option value="latest">الأحدث</option>
        <option value="oldest">الأقدم</option>
        <option value="min-price">الأقل سعرا</option>
        <option value="max-price">الأعلى سعرا</option>
        <option value="a-z">أ - ي</option>
        <option value="z-a">ي - أ</option>
      </select>
      <FilterIcon size={20} className="text-gray-500" />
    </div>
  );
}
