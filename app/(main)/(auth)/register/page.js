"use client"
import { useAlertMsg } from '@/app/_context/AlertMsgContext';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';


export default function Register () {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRRef = useRef(null);

  const router = useRouter();

  const {setAlert} = useAlertMsg()

  const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{1,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  function isValid(){

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = passwordRRef.current.value;

    const isNameValid = nameRegex.test(name);
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8
    const doPasswordsMatch = password === confirmPassword && password !== "";


    if (isNameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {
      return true
    } else {
      if      (!isNameValid) setAlert({isVisible: true, isSuccess: false, message:"الاسم غير صالح"});
      else if (!isEmailValid) setAlert({isVisible: true, isSuccess: false, message:"الإيميل غير صالح"});
      else if (!isPasswordValid) setAlert({isVisible: true, isSuccess: false, message:"كلمة المرور ضعيفة"});
      else if (!doPasswordsMatch) setAlert({isVisible: true, isSuccess: false, message:"كلمات المرور غير متطابقة"});
      return false;
    }

  }




  // Submit Handler
  async function registerHandler (e) {
    e.preventDefault();

// لو البيانات المكتوبه تمام
    if (isValid()){

// لو نجح مجرد ارسال طلب لانشاء الحساب
      try{
      const res = await fetch(`http://localhost:3000/api/register`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value, 
          email: emailRef.current.value, 
          password: passwordRef.current.value
        })
      })

// الرد على طلب انشاء الحساب
      const data = await res.json();

// لو نجح انشاء الحساب
      if (data.status === 201){

// نبعت طلب تسجيل دخول 
        const loginRes = await signIn('credentials', {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          redirect: false
        })

// لو نحج تسجيل الدخول
        if(loginRes.ok){
          router.replace(sessionStorage.getItem('prevPath' || '/'));
          router.refresh();
        }

// لو منجحش تسجيل الدخول 
        else{
          setAlert({isVisible: true, message: 'success register but login failed', isSuccess: false })
          router.replace('/login');
        }

// لو منجحش انشاء الحساب 
      } else setAlert({isVisible: true, message: data.message, isSuccess: false});
      }
// لو منجحش مجرد ارسال طلب لانشاء الحساب
      catch(err){
        console.log(err)
        setAlert({isVisible: true, message: 'network err try again', isSuccess: false})
      }
    }
    
  } 


  // auto focus on name input 
  useEffect(()=>{
    nameRef.current.focus();
  }, []);


  return (
    // الحاوية الخارجية
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 py-12">
      
      <div className="bg-white w-full max-w-[550px] rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f1f1] p-8 md:p-12">
        
        <div className="text-center mb-8">
          <h1 className="text-[#1a2b4b] text-3xl md:text-4xl font-bold mb-3">
            Create New Account
          </h1>
          <p className="text-[#71717a] text-sm md:text-base">
            Join us and start your journey today
          </p>
        </div>

        <form className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[#1a2b4b] font-semibold text-sm ml-1" htmlFor='fullname'>Full Name</label>
            <input 
              type="text" 
              placeholder="ex- Taha Ebrahim Mahmoud"
              className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5"
              id='fullname'
              required
              ref={nameRef}

            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#1a2b4b] font-semibold text-sm ml-1" htmlFor='email'>Email</label>
            <input 
              type="email" 
              placeholder="example@gmail.com"
              className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5"
              id='email'
              required
              ref={emailRef}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#1a2b4b] font-semibold text-sm ml-1" htmlFor='password'>Password</label>
            <input 
              type="password" 
              placeholder="Create a strong password"
              className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5"
              id='password'
              required
              ref={passwordRef}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#1a2b4b] font-semibold text-sm ml-1" htmlFor='re-password'>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Retype your password"
              className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5"
              id='re-password'
              required
              ref={passwordRRef}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#1c2645] text-white font-bold py-4 rounded-2xl mt-6 transition-colors shadow-lg shadow-blue-900/10 cursor-pointer hover:bg-blue-800"
            onClick={(e)=> registerHandler(e) }
          >
            Register
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#f1f1f1]"></div>
          </div>
          <span className="relative bg-white px-4 text-[#71717a] text-sm font-medium">or Register with</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="cursor-not-allowed flex items-center justify-center gap-2 bg-[#f4f7fa] py-4 rounded-2xl hover:bg-[#eceff3] transition-colors group border border-transparent hover:border-[#e2e8f0]">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />
            <span className="text-[#1a2b4b] font-semibold text-sm whitespace-nowrap">Google</span>
          </button>

          <button className="cursor-not-allowed flex items-center justify-center gap-2 bg-[#f4f7fa] py-4 rounded-2xl hover:bg-[#eceff3] transition-colors group border border-transparent hover:border-[#e2e8f0]">
            <img src="https://www.svgrepo.com/show/475654/github-color.svg" alt="github" className="w-5 h-5" />
            <span className="text-[#1a2b4b] font-semibold text-sm whitespace-nowrap">Github</span>
          </button>
        </div>

        <div className="text-center mt-10">
          <p className="text-[#71717a] text-sm">
            Already have an account? {' '}
            <Link href='/login' className="text-blue-600 font-bold hover:underline">
              Sign In Now!
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};


