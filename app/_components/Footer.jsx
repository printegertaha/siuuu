import React from 'react';
import { Mail, Phone, MapPin} from 'lucide-react'; // محتاج تثبت lucide-react أو استخدم أي icons تانية
import { FaApple, FaFacebook, FaGooglePlay, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 px-4 md:px-12 font-sans">
      {/* 1. Blue Newsletter Section */}
      <div className="max-w-7xl mx-auto bg-blue-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-lg overflow-hidden relative">
        {/* Background Overlay (اختياري لشكل الموجة) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 text-white max-w-md">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out Latest Trends & Offers</h2>
          <p className="text-blue-100">Register to receive news about the latest offers & discount codes</p>
        </div>

        <div className="relative z-10 flex w-full md:w-auto bg-white rounded-full p-1.5 shadow-md">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="grow px-6 py-3 rounded-full text-gray-800 focus:outline-none"
          />
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-semibold transition-all">
            Subscribe
          </button>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-gray-600 mb-16">
        
        {/* Help & Support */}
        <div>
          <h3 className="text-black font-bold text-xl mb-6">Help & Support</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-blue-600 shrink-0" size={20} />
              <span>685 Market Street, Las Vegas, LA 95820, United States.</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-600 shrink-0" size={20} />
              <span>(+099) 532-786-9843</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-600 shrink-0" size={20} />
              <span>support@example.com</span>
            </li>
          </ul>
          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" size={20} />
            <span className="font-bold cursor-pointer">X</span>
            <FaInstagram className="hover:text-pink-500 cursor-pointer" size={20} />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" size={20} />
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-black font-bold text-xl mb-6">Account</h3>
          <ul className="space-y-3">
            <li><Link href="/login" className="hover:text-blue-600">Login / Register</Link></li>
            <li><Link href="/cart" className="hover:text-blue-600">Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-blue-600">Wishlist</Link></li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="text-black font-bold text-xl mb-6">Quick Link</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Refund Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Use</a></li>
            <li><a href="#" className="hover:text-blue-600">FAQ's</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-black font-bold text-xl mb-6">Download App</h3>
          <p className="mb-6 text-sm">Save $3 With App & New User only</p>
          <div className="space-y-3">
            <button className="w-full bg-[#1c274c] text-white flex items-center justify-center gap-3 py-2 rounded-lg border border-gray-700 cursor-pointer ">
              <FaApple className="w-10 h-10" />
              <div className="text-left leading-tight">
                <p className="text-[10px]">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </button>
            <button className="w-full bg-[#3c50e0] text-white flex items-center justify-center gap-3 py-2 rounded-lg border border-gray-700 cursor-pointer  ">
              <FaGooglePlay className="w-10 h-10" />
              <div className="text-left leading-tight">
                <p className="text-[10px]">Get it On</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-8" />

      {/* 3. Bottom Footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-6 text-sm">
        <p>© 2026. All rights reserved by Pimjo.</p>
        <div className="flex items-center gap-4 grayscale opacity-70">
            <span className="text-xs mr-2">We Accept:</span>
            {/* استبدلهم بصور الدفع الحقيقية */}
            <div className="flex gap-3 text-lg font-bold">
                <span className="text-orange-500">MasterCard</span>
                <span className="text-blue-800">VISA</span>
                <span className="text-blue-500">PayPal</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;