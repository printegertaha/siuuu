import Filter from "@/app/_components/Filter";
import ProductCard from "@/app/_components/ProductCard";
import { Product } from "@/app/types";

interface Props {
  category_id: string;
  searchParams?: string;
}

const BASE_URL = "http://localhost:3000";

async function getCategoryProducts(
  category: string,
  sort: string,
): Promise<Product[]> {
  try {
    // 1. بناء الـ URL بشكل احترافي عشان نتجنب مشاكل الـ Strings
    const queryParams = new URLSearchParams({
      category: category,
      sort: sort,
    });

    const url = `${BASE_URL}/api/products?${queryParams.toString()}`;
    // console.log("Fetching from URL:", url); // بص على التيرمينال هنا

    const res = await fetch(url, {
      cache: "no-store", // الغي الكاش مؤقتاً عشان نتأكد إن الداتا فريش
    });

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      return [];
    }

    const result = await res.json();

    // 2. تريك الشك في شكل الـ Data:
    // جرب تطبع الـ result كاملة عشان تشوف هي [{...}] ولا { data: [{...}] }
    // console.log("Full API Result:", JSON.stringify(result).substring(0, 200));

    // عدل السطر ده بناءً على اللي هتشوفه في الـ Log
    const products = result?.data || result || [];
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsByCategory({params, searchParams}) {
  const {sort: sortValue} = await searchParams;
  const {category_id: currentCategory} = (await params) || 'latest';


  const products = await getCategoryProducts(currentCategory, sortValue);

  return (
    <div className="bg-gray-50 min-h-screen py-4 border" dir="rtl">
      <Filter />
      <div className="max-w-7xl mx-auto px-4 mt-4">

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard product={p} key={p._id} category={currentCategory} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-220px)]">
            <p className="text-red-700 font-bold text-xl">
              لا توجد منتجات حالياً
            </p>
            <p className="text-gray-400 text-sm">
              Category: {currentCategory} | Sort: {sortValue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
