"use client"
import React from 'react';
import { LayoutDashboard, ShoppingBag, Download, MapPin, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LogoutBtn from '@/app/_components/LogoutBtn';

export default function MyAccount ()  {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Orders', icon: <ShoppingBag size={20} />, active: false },
    { name: 'Downloads', icon: <Download size={20} />, active: false },
    { name: 'Addresses', icon: <MapPin size={20} />, active: false },
    { name: 'Account Details', icon: <User size={20} />, active: false },
    { name: 'Logout', icon: <LogOut size={20} />, active: false },
  ];

  const  {data: userInfo} =  useSession();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-800">My Account</h1>
        <nav className="text-sm text-gray-500">
          <Link href='/' >Home</Link> / <Link href='/my-account' className="text-blue-600">My Account</Link>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sidebar */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="p-6 text-center border-b border-gray-50">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User size={40} className="text-gray-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-700 break-words">{userInfo?.user?.name}</h2>
            <p className="text-xs text-gray-400 mt-1">Member Since Sep 2020</p>
          </div>
          
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  item.active 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-9 bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Hello <span className="font-semibold">{userInfo?.user?.name}</span> (not {userInfo?.user?.name}? <LogoutBtn />)
            </p>
            
            <p className="text-gray-600 text-sm leading-7">
              From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
