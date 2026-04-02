import React from 'react';
import { Phone, MapPin} from 'lucide-react'; 
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';

export default function Footer () {
  return (
    <footer className=" pt-16 mb-0 px-[5%]  font-sans mx-[2%] mt-3 rounded-2xl">
 
      <div className="  text-gray-600 mb-10">
        
        {/* Help & Support */}
        <div>
          <h3 className="text-black font-bold text-xl mb-4">Help & Support</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-blue-600 shrink-0" size={20} />
              <span className='overflow-x-auto '>7 Mr Taha Street, Quesna, Menofia, Egypt.</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-600 shrink-0" size={20} />
              <span className='overflow-x-auto '>(+20) 1008759327</span>
            </li>
            <li className="flex items-center gap-3 ">
              <FaWhatsapp className="text-blue-600 shrink-0" size={20} />
              <p className='overflow-x-auto '>(+20) 1008759327</p>
            </li>
          </ul>
          {/* Social Icons */}
          <div className="mt-6">
            <h3 className='text-black font-bold text-xl mb-4'>Social Media</h3>
            <ul  className="flex gap-4 ">
              <li><a target='_blank' href='https://www.facebook.com/taha.ebrahim.52459'><FaFacebook className="hover:text-blue-600 cursor-pointer" size={20} /></a></li>
              <li><a target='_blank' href='https://www.instagram.com/t2tae'><FaInstagram className="hover:text-pink-500 cursor-pointer" size={20} /></a></li>
            </ul>
          </div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto flex justify-center items-center text-sm pb-4">
        <p>© 2026. All rights reserved by Taha3.</p>
      </div>
    </footer>
  );
};