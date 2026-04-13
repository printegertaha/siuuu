import React from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function Loading() {
  return (
    <div className="min-h-screen bg-blue-500">
      <div className="h-50 flex items-center justify-center">
        <div className="w-5 h-5 border-t rounded-[50%] rotate-360 animate-spin"></div>
      </div>
      <Footer />
    </div>
  );
}
 