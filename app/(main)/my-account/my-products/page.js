"use client";

import { useState, useEffect } from "react";
import { usePopUp } from "@/app/_context/PopUpContext";
import { PencilIcon, Trash } from "lucide-react";
import { useAlertMsg } from "@/app/_context/AlertMsgContext";

export default function MyProducts() {
  const apiEndPoint = "/api/user/my-products";

  const { popUp, setPopUp } = usePopUp();
  const [userProducts, setUserProducts] = useState([]);
  const { setAlert } = useAlertMsg();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGettingProducts, setIsGettingProducts] = useState(false);

  // get products
  async function getUserProducts() {
    try {
      setIsGettingProducts(true);
      const res = await fetch(apiEndPoint, { method: "GET" });
      const resData = await res.json();
      if (res.ok) {
        setUserProducts(resData);
        console.log(resData);
        return resData;
      } else {
        throw new Error({ message: "cant get user products" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsGettingProducts(false);
    }
  }

  // delete user
  async function deleteProductHandler(product) {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/products/${product._id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setUserProducts((pre) => pre.filter((pro) => pro._id !== product._id));
        setAlert({ isVisible: true, message: "user deleted", isSuccess: true });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  }

  // run GET data func
  useEffect(() => {
    async function saveUserProduct() {
      const theUserProducts = await getUserProducts();
      setUserProducts(theUserProducts);
    }
    saveUserProduct();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-[calc(100vh-130px)] ltr text-left">
      {/* Header Section */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl max-[190px]:text-xs font-bold text-gray-800">Products Dashboard</h1>
        <p className="text-gray-500">
          Manage, edit, or delete your listed products with ease.
        </p>
      </div>

      {isGettingProducts ? (
        <div className="h-[calc(100vh-350px)] bg-red-600 flex items-center justify-center rounded-2xl">
          <div className="w-10 h-10 border border-t-red-600 rounded-[50%] rotate-360 animate-spin"></div>
        </div>
      ) : userProducts?.length && !isGettingProducts === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Trash className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            No products yet
          </h2>
          <p className="text-gray-500">
            Start adding your first product to see it here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {userProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
            >
              {/* Section 1: Media & Core Info */}
              <div className="flex flex-col sm:flex-row p-5 gap-4 md:gap-6 items-start">
                {/* 1. Main Thumbnail (Fixed Small Size) */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 ">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-2xl border border-gray-100 shadow-sm"
                    style={{ width: "150px" }}
                  />
                </div>

                {/* 2. Side Content: Slider & Data Row */}
                <div className="flex flex-col flex-grow w-full">
                  {/* Images Gallery Slider */}
                  <div className="flex flex-col gap-1.5 mb-3">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Images Gallery
                    </span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar p-2">
                      {product.images.map((img, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <img
                            src={img}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:scale-105"
                            title="Click to set as main image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Row: Title, Price, Category */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 bg-gray-50 p-3 md:p-4 rounded-2xl border border-gray-100">
                    <div className="flex-grow min-w-[120px]">
                      <span className="text-[10px] text-blue-500 font-bold block mb-0.5 uppercase">
                        Product Name
                      </span>
                      <h3 className="font-bold text-gray-800 text-base md:text-lg leading-none truncate ">
                        {product.title}
                      </h3>
                    </div>

                    <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

                    <div className="min-w-[80px]">
                      <span className="text-[10px] text-blue-500 font-bold block mb-0.5 uppercase">
                        Price
                      </span>
                      <div className="text-green-600 font-black text-lg md:text-xl">
                        <span className="text-sm mr-0.5">$</span>
                        {product.price}
                      </div>
                    </div>

                    <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

                    <div className=" felx flex-row items-center gap-1  flex-nowrap">
                      <span className="text-[10px] text-blue-500 font-bold block mb-0.5 uppercase ml-2">
                        Category
                      </span>
                      <span className="py-1 px-2 bg-white border border-gray-200 rounded-lg text-gray-700 text-xs font-bold shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Description Box */}
              <div className="px-5 md:px-6 py-3 bg-white border-t border-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    Product Description
                  </span>
                  <div className="flex-grow h-px bg-gray-100"></div>
                </div>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                  {product.description}
                </p>
              </div>

              {/* Section 3: Action Buttons */}
              <div className="px-5 md:px-6 py-3 bg-gray-50/80 border-t border-gray-100 flex justify-end items-center gap-3">
                <button
                  className={`flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-xs md:text-sm transition-colors px-4 py-2 rounded-lg hover:bg-red-50 ${isDeleting && "cursor-wait"}`}
                  onClick={() => {
                    deleteProductHandler(product);
                  }}
                  disabled={isDeleting}
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </button>

                <button
                  className="hidden flex items-center gap-2 px-6 md:px-8 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200 transition-all font-bold text-xs md:text-sm transform active:scale-95"
                  onClick={() => {}}
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
