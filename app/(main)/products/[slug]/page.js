import React from "react";
// 1. Server-Side Fetching (كما هي، أداء مثالي)
async function getProductData(id) {
  try {
    const res = await fetch(`https://siuuu-six.vercel.app/api/products/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const productID = slug.split("PID").at(-1).replace("-", "");
  const product = await getProductData(productID);

  if (!product) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
          شكلك نسيت تضيف الدومين قبل / api , المنتج مش موجود 
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900" dir="rtl">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 overflow-hidden">
        {/* Main Grid: بيقسم الصفحة نصين على الأيباد (md) فما فوق */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16 items-start">
          {/* ================================================================
              قسم الصور (RESPONSIVE) - ده اللي فيه التعديل الجوهري
              ================================================================ */}
          <div className="flex flex-col md:flex-row-reverse md:gap-x-4">
            {/* 1. الصورة الرئيسية */}
            <div className="w-full md:flex-1">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-center object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* 2. معرض الصور الإضافية - السحر هنا */}
            {product.images?.length > 0 && (
              <div
                className={`
                  no-scrollbar
                  mt-4 md:mt-0 md:w-28 md:max-h-[85vh] 
                  flex md:flex-col gap-3 
                  overflow-x-auto md:overflow-y-auto md:overflow-x-hidden
                  pb-2 md:pb-0 md:pr-1
                  snap-x md:snap-y scrollbar-thin scrollbar-thumb-gray-200
                `}
              >
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-24 md:w-full h-24 md:h-auto aspect-square rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all snap-start"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* ================================================================ */}

          {/* قسم معلومات المنتج (كما هو، تصميم احترافي) */}
          <div className="mt-10 px-4 sm:px-0 md:mt-0">
            <div className="flex justify-between items-baseline gap-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-950">
                {product.title}
              </h1>
              <span className="text-3xl font-bold text-indigo-700 whitespace-nowrap">
                {product.price} ج.م
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-950 uppercase tracking-wide">
                الوصف
              </h3>
              <div className="mt-3 text-gray-700 leading-relaxed prose prose-sm max-w-none">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-1/2 left-5 -translate-y-1/2 opacity-80  capitalize text-sm text-red-600">
          لسه الصفحة دي تحت الانشاء دا تصميم تجربة بس
        </div>
      </main>
    </div>
  );
}
