"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import useCategories from "../hooks/useCategories";
import { Category } from "../types";


interface CategoriesSelectProps {
  mode?: "categoryNavigate" | "categorySelect";
  updateCategoryInFormSelect?: (categoryName: string) => void;
}

export default function CategoriesSelect({
  mode = "categoryNavigate",
  updateCategoryInFormSelect,
}: CategoriesSelectProps) {
  const { data: categories } = useCategories() as {
    data: Category[] | undefined;
  };

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [categorySelected, setCategorySelected] = useState<string>(
    mode === "categoryNavigate" ? "All Categories" : "Select Category",
  );

  const pathname = usePathname();

  const selectBoxRef = useRef<HTMLDivElement>(null);

  const categoryFromURL = pathname
    .split("/")[2]
    ?.replaceAll("--", " & ")
    .replaceAll("-", " ");

  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("click", clickOutsideHandler);
    return () => document.removeEventListener("click", clickOutsideHandler);
  }, []);

  useEffect(() => {
    if (!pathname.includes("categories")) {
      setCategorySelected("All Categories");
    }
  }, [pathname]);

  return (
    <div
      className={`categoriesSelect relative w-full ${
        mode === "categoryNavigate" ? "hidden min-[915px]:grid" : ""
      } ${categories ? "cursor-pointer" : "cursor-not-allowed"} grid grid-cols-[20px_1fr_10px] items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-2xl z-2`}
      onClick={() => setIsCategoryOpen((pre) => !pre)}
      ref={selectBoxRef}
    >
      <FaBars />
      <span className="w-max px-2 capitalize">
        {pathname?.split("/")[1] === "categories"
          ? categoryFromURL
          : categorySelected}
      </span>
      <span>
        {isCategoryOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </span>

      <ul className="absolute top-10 w-full rounded-2xl bg-gray-50 shadow">
        {isCategoryOpen && categories
          ? categories.map((category) => (
              <li
                key={category._id}
                onClick={() => {
                  setCategorySelected(category.nickName); // لاحظ هنا انها عكت مني لاني فوق محددلها قيمتين بس
                  if (mode === "categorySelect" && updateCategoryInFormSelect) {
                    updateCategoryInFormSelect(category.name);
                  }
                }}
                className={`rounded-md w-full bg-gray-50 hover:text-[blue] ${
                  categorySelected === category.nickName ? "bg-gray-300" : ""
                } ${mode === "categorySelect" ? "block px-3 py-1.5" : ""}`}
              >
                {mode === "categoryNavigate" ? (
                  <Link
                    href={`/categories/${category.name}`}
                    className="block px-3 py-1.5 capitalize"
                  >
                    {category.nickName}
                  </Link>
                ) : (
                  category.nickName
                )}
              </li>
            ))
          : !categories &&
            isCategoryOpen &&
            [...Array(4)].map((_, i) => (
              <li
                key={i}
                className="h-5 bg-gray-300 rounded-md animate-pulse my-2 mx-2 w-auto"
              ></li>
            ))}
      </ul>
    </div>
  );
}
