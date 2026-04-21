import Image from "next/image";
import { Heart } from "lucide-react";
import { FaPoundSign } from "react-icons/fa";
import Link from "next/link";

export default function ProductCard({ product, category }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-md">
      {/* Image Container */}
      <Link
        href={`/products/${product?.title?.replaceAll(" ", "-")}-PID-${product?._id}`}
        className="block relative aspect-16/11 overflow-hidden bg-gray-100"
      >
        <Image
          src={product?.thumbnail || '/don.jpeg'}
          alt={product?.title || 'product image'}
          fill
          sizes="(max-width: 768px) 100dvw, (max-width: 1200px) 50dvw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-0.5">
          <Link
            href={`/products/${product?.title?.replaceAll(" ", "-")}-PID-${product?._id}`}
          >
            <h3 className="text-base font-bold text-gray-800 line-clamp-1 group-hover:text-sky-600 transition-colors">
              {product?.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            {category}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-1 gap-3">
          <div className="flex items-center text-xl font-black text-gray-950 shrink-0">
            <span className="mr-0.5">{product?.price}</span>
            <FaPoundSign className="text-xs text-sky-600 self-start mt-1.5" />
          </div>
          <button
            type="button"
            className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-sky-500 transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <button
        type="button"
        className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-sm text-gray-700 hover:bg-red-50 hover:text-black transition-all duration-300 transform active:scale-90"
      >
        <Heart size={18} />
      </button>
    </div>
  );
}
