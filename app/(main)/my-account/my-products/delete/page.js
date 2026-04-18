'use client'; // ضروري عشان نستخدم الـ State والـ Events

import { useState } from 'react';

export default function DeleteProduct() {
  const [productId, setProductId] = useState('');
  const [status, setStatus] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setStatus('جاري الحذف...');

    try {
      // استبدل الرابط برابط الـ API بتاعك
      const response = await fetch(`/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setStatus('✅ تم حذف المنتج بنجاح!');
        setProductId(''); // تصفير الحقل
      } else {
        setStatus('❌ فشل الحذف: تأكد من الـ ID');
      }
    } catch (error) {
      setStatus('❌ خطأ في الاتصال بالسيرفر');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h3>حذف منتج</h3>
        <form onSubmit={handleDelete}>
          <input
            type="text"
            placeholder="ادخل ID المنتج هنا"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>حذف الآن</button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
      </div>
      <p className='fixed top-1/4 left-1/2 z-200 text-red-600'>تجربة يا بيه </p>
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', marginTop: '100px', fontFamily: 'Arial' },
  card: { border: '1px solid #ddd', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '300px' },
  input: { padding: '10px', width: '90%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px 20px', backgroundColor: '#d9534f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  status: { marginTop: '15px', fontSize: '14px', fontWeight: 'bold' }
};