"use client";

import React, { useState, useEffect } from 'react';

export default function TestoPage() {
  const [mounted, setMounted] = useState(false); // عشان نتأكد إننا في الـ Client
  const [userData, setUserData] = useState({
    ip: "جاري التحميل...",
    userAgent: "",
    location: { lat: null, lon: null },
    status: "بانتظار الموافقة..."
  });

  useEffect(() => {
    setMounted(true); // الصفحة كدة حصل لها Mount في المتصفح

    // 1. جلب الـ IP
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserData(prev => ({ ...prev, ip: data.ip, userAgent: navigator.userAgent })))
      .catch(() => console.error("IP Error"));

    // 2. طلب الموقع
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserData(prev => ({
            ...prev,
            location: { lat: pos.coords.latitude, lon: pos.coords.longitude },
            status: "تم بنجاح ✅"
          }));
        },
        () => setUserData(prev => ({ ...prev, status: "تم الرفض ❌" })),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // لو لسه السيرفر بيحمل، م تعرضش البيانات الحساسة للمتصفح عشان ميحصلش Hydration error
  if (!mounted) return <div style={{padding: '20px'}}>جاري تهيئة الصفحة...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', direction: 'rtl', textAlign: 'right' }}>
      <h1 style={{ color: '#0070f3' }}>لوحة الاختبار - Siuuu</h1>
      <hr />
      
      <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '10px' }}>
        <h3>📡 بيانات الجهاز:</h3>
        <p><b>IP:</b> {userData.ip}</p>
        <p><b>الجهاز:</b> <small>{userData.userAgent}</small></p>
      </div>

      <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px', borderRadius: '10px' }}>
        <h3>📍 الموقع الجغرافي:</h3>
        <p><b>الحالة:</b> {userData.status}</p>
        
        {userData.location.lat && (
          <div style={{ background: '#f9f9f9', padding: '10px', marginTop: '10px' }}>
            <p><b>Lat:</b> {userData.location.lat} | <b>Lon:</b> {userData.location.lon}</p>
            <a 
              href={`https://www.google.com/maps?q=${userData.location.lat},${userData.location.lon}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ padding: '10px', background: '#4285F4', color: '#fff', display: 'inline-block', borderRadius: '5px', textDecoration: 'none' }}
            >
              🗺️ فتح الخريطة
            </a>
          </div>
        )}
      </div>
    </div>
  );
}