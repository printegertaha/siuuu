"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";

export default function CategoriesSelect({
  mode = "categoryNavigate",
  updateCategoryInFormSelect,
}) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categorySelected, setCategorySelected] = useState(
    mode === "categoryNavigate" ? "All Categories" : "Select Category",
  );
  const pathname = usePathname();
  const selectBoxRef = useRef(null);
  //   لو هوا في صفحة كاتيجوريز بنجيبه من الرابط عشان لو عمل ريلود بيرجع لأصله في الاستيت
  const categoryFromURL = pathname
    .split("/")[2]
    ?.replaceAll("--", " & ")
    .replaceAll("-", " ");

  //   Get Categories From Serve
  useEffect(() => {
    async function getCategories() {
      const res = await fetch("http://localhost:3000/api/categories");
      const resData = await res.json();
      if (res.ok) {
        setCategoriesData(resData.data);
      }
    }
    getCategories();
  }, []);

  //   Handle Click Outside To Close
  useEffect(() => {
    function clickOutsideHandler(e) {
      if (!selectBoxRef?.current?.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("click", clickOutsideHandler);

    return () => document.removeEventListener("click", clickOutsideHandler);
  }, []);

  return (
    <div
      className={`categoriesSelect relative w-full  ${mode === 'categoryNavigate' && 'hidden min-[915px]:grid'} grid grid-cols-[20px_1fr_10px] items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-2xl cursor-pointer z-2`}
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
      {isCategoryOpen && (
        <ul
          className="absolute top-10 w-full  rounded-2xl  bg-gray-50 shadow "
        >
          {categoriesData.map((category) => (
            <li
              key={category._id}
              onClick={() => {
                setCategorySelected(category.nickName);
                mode === 'categorySelect' && updateCategoryInFormSelect(category.name);
              }}
              className={`rounded-md w-full bg-gray-50 hover:text-[blue]  ${categorySelected === category.nickName && "bg-gray-300"} ${mode === "categorySelect" && "block px-3 py-1.5"}`}
            >
              {mode === "categoryNavigate" ? (
                <Link
                  href={`/categories/${category?.name}`}
                  className="block px-3 py-1.5  "
                >
                  {category.nickName}
                </Link>
              ) : (
                category.nickName
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
