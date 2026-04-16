
export default function SkeletonProducts() {
  return (
    <div className="relative min-w-[250px] bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      
      {/* Image Skeleton */}
      <div className="relative aspect-16/11 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        
        {/* Title & Category */}
        <div className="space-y-2">
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />
          {/* Category */}
          <div className="h-3 bg-gray-100 rounded-md w-1/4" />
        </div>

        {/* Price & Button */}
        <div className="flex flex-wrap items-center justify-between pt-1 gap-3">
          {/* Price */}
          <div className="h-6 bg-gray-200 rounded-md w-16 shrink-0" />
          
          {/* Button */}
          <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* Wishlist Button Skeleton */}
      <div className="absolute top-3 right-3 bg-gray-200/50 p-4 rounded-full" />
      
    </div>
  );
}