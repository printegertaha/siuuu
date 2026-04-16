"use client";
import Filter from "@/app/_components/Filter";
import ProductCard from "@/app/_components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useAlertMsg } from "@/app/_context/AlertMsgContext";
import SkeletonProducts from "@/app/skelton/SkeletonProducts";

export default function ProductsByCategory() {
  const pathname = usePathname();
  const readOnlySearchParams = useSearchParams();
  const currentCategory = pathname.split("/")[2];
  const { setAlert } = useAlertMsg();

  async function getProducts() {
    console.log(`is fetching ${currentCategory} products....`);
    const sortValue = readOnlySearchParams.get("sort");
    const res = await fetch(
      `/api/products?category=${currentCategory}&sort=${sortValue}`,
    );
    if (res.status == 500) {
      console.log(res.status);
      setAlert({
        isVisible: true,
        message: "err, check the internet and try again",
        isSuccess: false,
      });
      return [];
    } else {
      console.log(res.status);
      const data = await res.json();
      return data?.data;
    }
  }

  const {
    data: filteredProducts,
    isLoading: isGettingProducts,
    isFetching,
  } = useQuery({
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
  console.log('isFetching: '+isFetching)

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <section className="flex justify-between items-start ">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 tracking-tight">
            Explore{" "}
            <span className="text-sky-500 capitalize">{currentCategory}</span>
          </h2>
          <Filter />
        </section>

        {filteredProducts?.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${isFetching ? "opacity-50" : "opacity-100"}`}
          >
            {filteredProducts.map((p) => (
              <ProductCard product={p} key={p._id} category={currentCategory} />
            ))}
          </div>
        ) : isGettingProducts ? (
          <div className="flex flex-wrap gap-4 justify-center ">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonProducts key={idx} />
            ))}
          </div>
        ) :  (
          <div className="flex items-center justify-center h-[calc(100vh-220px)] text-red-700">
            No Products Found
          </div>
        )}
      </div>
      {isFetching && !isGettingProducts && <div className="fixed top-1/2 left-1/2 -translate-1/2 w-10 h-10 rounded-full border-2 border-t-blue-500 animate-spin rotate-360"></div>}
    </div>
  );
}
