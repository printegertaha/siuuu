"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null); // التصنيف اللي بيتم تعديله حالياً
  const [deleteId, setDeleteId] = useState(null); // للتأكد من حذف عنصر واحد
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false); // للتأكد من حذف الكل
  const [formData, setFormData] = useState({ name: '', nickName: '' });
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const API_URL = "http://localhost:3001/api/categories";


  async function fetchCategories ()  {
    try {
      setIsFetching(true)
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) { console.error("Error:", error)
    }finally{
      setIsFetching(false)
    }
  };

  // --- Functions (Add, Update, Delete) ---
  async function handleAdd (e) {
    e.preventDefault();
    setLoading(true);
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setFormData({ name: '', nickName: '' });
    setShowAddForm(false);
    fetchCategories();
    setLoading(false);
  };

  async function handleUpdate (e) {
    e.preventDefault();
    setLoading(true);
    await fetch(`${API_URL}/${editCategory._id}`, { // تأكد من الـ endpoint حسب الباك اند عندك
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editCategory),
    });
    setEditCategory(null);
    fetchCategories();
    setLoading(false);
  };

  async function handleDelete (id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchCategories();
  };

  async function handleDeleteAll () {
    await fetch(API_URL, { method: 'DELETE' });
    setIsDeleteAllOpen(false);
    fetchCategories();
  };
 
useEffect(()=> {
  const intervalGet = setTimeout(()=>{
    fetchCategories()
  }, 0)
}, [])

console.log(isFetching)

  return (
    <div className="p-4 md:p-و10 bg-[#f8fafc] min-h-[calc(100vh-64px)] font-sans text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">إدارة التصنيفات</h1>
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
        {isFetching ? 
          <div className='bg-blue-900 h-80 rounded-3xl flex items-center justify-center'>
            <div className='h-20 w-20 rounded-[50%] border-3 border-gray-500 border-t-amber-50 rotate-360 animate-spin'></div>
          </div>
        :
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
                      <span className="text-sm bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full inline-block mt-2">@{cat.nickName}</span>
                    </div>
                    <div className="flex justify-end gap-2 border-t pt-4 mt-2">
                      <button onClick={() => setEditCategory(cat)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">تعديل</button>
                      <button onClick={() => setDeleteId(cat._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">حذف</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
          </div>
        }

        {/* --- Modals (Popups) --- */}

        {/* Modal: Add/Edit Form */}
        <AnimatePresence>
          {(showAddForm || editCategory) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => { setShowAddForm(false); setEditCategory(null); }}
                className="absolute inset-0 bg-black/40 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6">{editCategory ? "تعديل التصنيف" : "تصنيف جديد"}</h2>
                <form onSubmit={editCategory ? handleUpdate : handleAdd} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">اسم التصنيف</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      value={editCategory ? editCategory.name : formData.name}
                      onChange={(e) => editCategory ? setEditCategory({...editCategory, name: e.target.value}) : setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">اللقب (Slug/Nickname)</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                      value={editCategory ? editCategory.nickName : formData.nickName}
                      onChange={(e) => editCategory ? setEditCategory({...editCategory, nickName: e.target.value}) : setFormData({...formData, nickName: e.target.value})}
                      required
                    />
                  </div>
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                    {loading ? "جاري المعالجة..." : (editCategory ? "تحديث البيانات" : "إنشاء الآن")}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Delete Confirmation (Single & All) */}
        <AnimatePresence>
          {(deleteId || isDeleteAllOpen) && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {setDeleteId(null); setIsDeleteAllOpen(false);}} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl p-6 w-full max-w-sm relative text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">!</div>
                <h3 className="text-xl font-bold text-gray-800">هل أنت متأكد؟</h3>
                <p className="text-gray-500 mt-2">لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => {setDeleteId(null); setIsDeleteAllOpen(false);}} className="flex-1 py-3 bg-gray-100 rounded-xl font-semibold">إلغاء</button>
                  <button 
                    onClick={() => deleteId ? handleDelete(deleteId) : handleDeleteAll()} 
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