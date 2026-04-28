"use client";
import CategoriesSelect from "@/app/_components/CategoriesSelect";
import { useAlertMsg } from "@/app/_context/AlertMsgContext";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateProduct() {
  const [isCreating, setIsCreating] = useState(false);
  const { data: userInfo } = useSession();
  const { setAlert } = useAlertMsg();

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    ownerID: "",
  });
  const [gellary, setGellary] = useState([]);
  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    const category = productData?.category;
    const title = productData?.title.trim().length >= 1;
    const price = productData?.price > 0;
    const description = productData?.description.trim().length >= 3;
    const gellaryValidation = gellary.length > 0;
    const ownerID = userInfo.user.id;

    if (
      category &&
      title &&
      price &&
      description &&
      gellaryValidation &&
      ownerID
    ) {
      setIsCreating(true);
      const formData = new FormData();
      formData.append("category", productData.category);
      formData.append("one", "1");
      formData.append("title", productData?.title);
      formData.append("price", productData?.price);
      formData.append("description", productData?.description);
      formData.append("ownerID", userInfo?.user.id);
      formData.append("thumbnail", gellary[0]);
      gellary.slice(1).forEach((img) => formData.append("images", img));

      try {
        const res = await fetch("/api/products", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          setAlert({
            isVisible: true,
            message: "تم انشاء المنتج",
            isSuccess: true,
          });
          setProductData({
            category: "",
            title: "",
            price: "",
            description: "",
            ownerID: "",
          });
          setGellary([]);
          router.push('/my-account/my-products')
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsCreating(false);
      }
    } else {
      setAlert({
        isVisible: true,
        isSuccess: false,
        message: !category
          ? "اختار تصنيف"
          : !title
            ? "شكلك نسيت الاسم"
            : !price
              ? "حط سعر بقا"
              : !description
                ? "الوصف يا نجم"
                : !ownerID
                  ? "بياناتك مش مسجله"
                  : !gellaryValidation
                    ? "ما تختار صورة"
                    : "can't send data check inputs",
      });
    }
  }

  // حفظ اختيار النصوص
  function inputHandler(e) {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }
  // حفظ اختيار التصنيف
  function updataCategory(catego) {
    setProductData({ ...productData, category: catego });
  }

  function deleteImgFromSelected(imageIndex) {
    const updatedGellary = gellary.filter((_, idx) => imageIndex !== idx);
    if (gellary[imageIndex].fakeUrl) {
      URL.revokeObjectURL(gellary[imageIndex].fakeUrl);
    }
    setGellary(updatedGellary);
  }

  useEffect(() => {
    return () =>
      gellary.forEach((img) => {
        if (img?.fakeUrl) URL.revokeObjectURL(img.fakeUrl);
      });
  }, []);


  return (
    <div className="min-h-dscreen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
        {/*      Header                                                        */}
        <div className="bg-blue-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            إضافة منتج جديد
          </h2>
          <p className="text-blue-100 text-sm text-center mt-1">
            أدخل تفاصيل المنتج بدقة لجذب المشترين
          </p>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-5">
          {/* Categories Select */}
          <CategoriesSelect
            mode={"categorySelect"}
            updateCategoryInFormSelect={updataCategory}
          />

          {/*       Title                                                        */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              اسم المنتج
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="مثال: آيفون 15 برو"
              onChange={(e) => inputHandler(e)}
              value={productData.title}
            />
          </div>

          {/*        Price                                                       */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              السعر ($)
            </label>
            <input
              type="number"
              name="price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="0.00"
              onChange={(e) => inputHandler(e)}
              value={productData.price}
            />
          </div>

          {/*        Description                                                 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              وصف المنتج
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="اكتب تفاصيل المنتج هنا..."
              onChange={(e) => inputHandler(e)}
              value={productData.description}
            ></textarea>
          </div>

          {/*       Images                                                        */}
          <div className="relative border h-40 w-full rounded-2xl overflow-hidden">
            <input
              className="opacity-0  absolute inset-0 z-1"
              type="file"
              multiple
              onChange={(e) =>
                setGellary((pre) => [
                  ...pre,
                  ...Array.from(e.target.files).map((file) =>
                    Object.assign(file, { fakeUrl: URL.createObjectURL(file) }),
                  ),
                ])
              }
            />
            <img
              src="/upload.png"
              className="w-40 h-40 absolute inset-0 mx-auto z-0"
            />
          </div>

          {/* Images Show */}
          {gellary?.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto border no-scrollbar rounded-2xl p-2 h-24">
              {gellary?.map((img, idx) => (
                <div key={idx} className="relative shrink-0 h-20 w-20">
                  <img src={img.fakeUrl} className="w-full h-full rounded-sm" />
                  <button
                    type="button"
                    className="bg-gray-900/70  absolute text-gray-300 rounded-2xl cursor-pointer top-1 right-1 "
                    onClick={() => deleteImgFromSelected(idx)}
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/*       Submit Button                                                 */}
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all active:scale-[0.98] mt-4 ${isCreating && "cursor-wait"}`}
            disabled={isCreating}
          >
            {isCreating ? "Creating.." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

// عايزين نعرض الصور اللي المستخدم اخ
