"use client";
import { FilterIcon } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Filter() {
  const readOnlySearchParams = useSearchParams();
  const searchParams = new URLSearchParams(readOnlySearchParams.toString()); // page=2&sort=time
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <div className="flex gap-2 h-fitobject items-center border p-2 rounded-md">
      <select
        className="outline-none bg-transparent cursor-pointer"
        defaultValue={readOnlySearchParams.get("sort") || "latest"}
        onChange={(e) => {
          searchParams.set("sort", e.target.value);
          replace(`${pathname}?${searchParams}`);
        }}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="min-price">Min Price</option>
        <option value="max-price">Max Price</option>
        <option value="a-z">A - Z</option>
        <option value="z-a">Z - A</option>
      </select>
      <FilterIcon size={20} className="text-gray-500" />
    </div>
  );
}
