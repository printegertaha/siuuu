"use client";

import { useAlertMsg } from "../_context/AlertMsgContext";
import { Product } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";

export default function useCategoryProducts() {
  const { setAlert } = useAlertMsg();
  const pathname = usePathname();
  const readOnlySearchParams = useSearchParams();
  const currentCategory: string = pathname.split("/")[2];

  // any async func must have return : Promise<type>
  async function getProducts(): Promise<Product[]> {
    console.log(`is fetching ${currentCategory} products....`);
    const sortValue = readOnlySearchParams.get("sort");

    const res = await fetch(
      `/api/products?category=${currentCategory}&sort=${sortValue || ""}`,
    );

    if (res.status === 500) {
      setAlert({
        isVisible: true,
        message: "err, check the internet and try again",
        isSuccess: false,
      });
      return [];
    } else {
      const result = await res.json();
      return result?.data || [];
    }
  }

  const { data: filteredProducts, isLoading: isGettingProducts } = useQuery<
    Product[]
  >({
    queryKey: [
      "filteredProducts",
      currentCategory,
      readOnlySearchParams.toString(),
    ],
    queryFn: getProducts,
    staleTime: 1000 * 28,
    refetchInterval: 1000 * 30,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: false,
    placeholderData: (prev) => prev,
  });
  return { filteredProducts, isGettingProducts, currentCategory };
}
