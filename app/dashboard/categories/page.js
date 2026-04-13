"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", nickName: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const API_URL = "/api/categories";

  async function fetchCategories() {
    try {
      setIsFetching(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false);
    }
  }

  // دالة تحويل الصورة إلى Base64 (Helper Function)
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // 1. دالة الإضافة (Add)
  async function handleAdd(e) {
    e.preventDefault();
    if (!image) return alert("يرجى اختيار صورة أولاً");
    setLoading(true);

    try {
      const base64Image = await convertToBase64(image);

      const payload = {
        name: formData.name,
        nickName: formData.nickName,
        image: base64Image, // تُرسل كـ String
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({ name: "", nickName: "" });
        setImage(null);
        setShowAddForm(false);
        fetchCategories();
      } else {
        const errData = await res.json();
        console.log(errData );
      }
    } catch (error) {
      console.error("Add Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // 2. دالة التعديل (Update)
  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let base64Image = editCategory.image; // الصورة القديمة افتراضياً

      // إذا اختار المستخدم صورة جديدة، نقم بتحويلها
      if (image) {
        base64Image = await convertToBase64(image);
      }

      const payload = {
        name: editCategory.name,
        nickName: editCategory.nickName,
        image: base64Image,
      };

      const res = await fetch(`${API_URL}/${editCategory._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEditCategory(null);
        setImage(null);
        fetchCategories();
      } else {
        alert("فشل تحديث البيانات - تأكد من حجم الصورة");
      }
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setDeleteId(null);
    fetchCategories();
  }

  async function handleDeleteAll() {
    await fetch(API_URL, { method: "DELETE" });
    setIsDeleteAllOpen(false);
    fetchCategories();
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-[calc(100vh-64px)] font-sans text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              إدارة التصنيفات
            </h1>
            <p className="text-gray-400 mt-1">تحكم في جميع أقسام متجرك من مكان واحد</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => categories?.length > 0 && setIsDeleteAllOpen(true)}
              className="px-5 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all font-medium border border-red-100"
            >
              حذف الكل
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all font-bold"
            >
              إضافة تصنيف +
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        {isFetching ? (
          <div className="bg-white h-80 rounded-3xl flex items-center justify-center border border-gray-100 shadow-sm">
            <div className="h-12 w-12 rounded-full border-4 border-gray-100 border-t-indigo-600 animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {categories.map((cat) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={cat._id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500 transition-all group-hover:w-2" />
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{cat.name}</h3>
                    <span className="text-sm bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full inline-block mt-2">
                      @{cat.nickName}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2 border-t pt-4 mt-2">
                    <button
                      onClick={() => setEditCategory(cat)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors font-semibold text-sm"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => setDeleteId(cat._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-semibold text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal: Add/Edit Form */}
        <AnimatePresence>
          {(showAddForm || editCategory) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowAddForm(false);
                  setEditCategory(null);
                  setImage(null);
                }}
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
              />
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6">{editCategory ? "تعديل التصنيف" : "تصنيف جديد"}</h2>
                <form onSubmit={editCategory ? handleUpdate : handleAdd} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">اسم التصنيف</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      value={editCategory ? editCategory.name : formData.name}
                      onChange={(e) =>
                        editCategory
                          ? setEditCategory({ ...editCategory, name: e.target.value })
                          : setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">اللقب (Slug/Nickname)</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      value={editCategory ? editCategory.nickName : formData.nickName}
                      onChange={(e) =>
                        editCategory
                          ? setEditCategory({ ...editCategory, nickName: e.target.value })
                          : setFormData({ ...formData, nickName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">الصورة</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                      onChange={(e) => setImage(e.target.files[0])}
                      required={!editCategory} // مطلوبة فقط في حالة الإضافة
                    />
                    {editCategory && <p className="text-[10px] text-gray-400 mt-1">* اتركه فارغاً للحفاظ على الصورة القديمة</p>}
                  </div>
                  <button
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all disabled:bg-gray-400"
                  >
                    {loading ? "جاري المعالجة..." : editCategory ? "تحديث البيانات" : "إنشاء الآن"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Delete Confirmation */}
        <AnimatePresence>
          {(deleteId || isDeleteAllOpen) && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setDeleteId(null);
                  setIsDeleteAllOpen(false);
                }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-6 w-full max-w-sm relative text-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  !
                </div>
                <h3 className="text-xl font-bold text-gray-800">هل أنت متأكد؟</h3>
                <p className="text-gray-500 mt-2">لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.</p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setDeleteId(null);
                      setIsDeleteAllOpen(false);
                    }}
                    className="flex-1 py-3 bg-gray-100 rounded-xl font-semibold"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => (deleteId ? handleDelete(deleteId) : handleDeleteAll())}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg shadow-red-100"
                  >
                    تأكيد الحذف
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}