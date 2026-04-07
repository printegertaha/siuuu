"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function PathLink() {
  const pathname = usePathname()

  // تعريف المسارات الثابتة التي تريدينها أن تظهر دائماً
  const breadcrumbSteps = [
    { label: "My Account", href: "/my-account" },
    { label: "My Products", href: "/my-account/my-products" },
    { label: "Create Product", href: "/my-account/my-products/create-product" },
  ]

  return (
    <>
      {/* مساحة تعويض الهيدر الثابت */}
      <div className='h-12 w-full'></div>
      
      <div className="w-full h-12 fixed top-20 max-[190px]:top-15 left-0 px-[5%] sm:px-[10%] bg-white border-b border-gray-300 flex items-center z-10 shadow-sm overflow-x-auto no-scrollbar">
        <nav aria-label="Breadcrumb" className="flex items-center whitespace-nowrap gap-2 text-[10px] sm:text-sm text-gray-500">
          
          {breadcrumbSteps.map((step, idx) => {
            // التحقق هل الرابط الحالي يطابق رابط الخطوة
            const isActive = pathname === step.href;
            const isLast = idx === breadcrumbSteps.length - 1;

            return (
              <React.Fragment key={idx}>
                <Link 
                  href={step.href} 
                  className={`transition-all duration-200 
                    ${isActive 
                      ? 'text-blue-700 font-bold scale-105' // الشكل عندما تكونين في هذه الصفحة
                      : 'hover:text-gray-900 text-gray-400' // الشكل لباقي المسارات
                    }`}
                >
                  {step.label}
                </Link>

                {/* رسم الفاصل المائل إلا بعد آخر عنصر */}
                {!isLast && (
                  <span className="text-gray-300 font-light mx-1 sm:mx-2 text-xs sm:text-base">
                    /
                  </span>
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </>
  )
}