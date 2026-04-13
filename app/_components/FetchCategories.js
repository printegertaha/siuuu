"use client";

import { useQuery } from "@tanstack/react-query";
import { useAlertMsg } from "../_context/AlertMsgContext";

// دالة جلب البيانات - يفضل تكون خارج الـ hook
async function fetchCategories() {
  console.log("is fetching categories...");
  const res = await fetch("/api/categories");

  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data?.data;
}

export default function useCategories() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 2,
  });

  // بنرجع الداتا والحالات اللي المكونات محتاجاها
  return {
    categories: categories || [], // عشان نضمن إنها مصفوفة حتى لو لسه بتحمل
    isLoading,
    isError,
    error,
  };
}
