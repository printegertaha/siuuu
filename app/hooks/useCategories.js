"use client";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) {
        throw new Error("failed to get categories");
      }
      const data = (await res.json())?.data;
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
}
