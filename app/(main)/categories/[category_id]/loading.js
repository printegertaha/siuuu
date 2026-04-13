// app/categories/[category]/loading.js
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-sky-500 animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading products...</p>
    </div>
  );
}