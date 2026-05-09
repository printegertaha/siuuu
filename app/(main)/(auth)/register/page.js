"use client";
import { useAlertMsg } from "@/app/_context/AlertMsgContext";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Loader from "../Loader";

export default function Register() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordR: "",
  });

  // password arr to compare
  const passwordArr = formData?.password?.split("");
  const passwordRArr = formData?.passwordR?.split("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordR, setShowPasswordR] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);

  const abortControllerRef = useRef(null);

  const router = useRouter();

  const { setAlert } = useAlertMsg();

  const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{1,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let emailFocusInterval;

  function isValid() {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.passwordR;

    const isNameValid = nameRegex.test(name);
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;
    const doPasswordsMatch = password === confirmPassword && password !== "";

    if (isNameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {
      return true;
    } else {
      if (!isNameValid)
        setAlert({
          isVisible: true,
          isSuccess: false,
          message: "الاسم غير صالح",
        });
      else if (!isEmailValid)
        setAlert({
          isVisible: true,
          isSuccess: false,
          message: "الإيميل غير صالح",
        });
      else if (!isPasswordValid)
        setAlert({
          isVisible: true,
          isSuccess: false,
          message: "كلمة المرور ضعيفة",
        });
      else if (!doPasswordsMatch)
        setAlert({
          isVisible: true,
          isSuccess: false,
          message: "كلمات المرور غير متطابقة",
        });
      return false;
    }
  }

  // Submit Handler
  async function registerHandler(e) {
    e.preventDefault();

    // لو البيانات المكتوبه تمام
    if (isValid()) {
      setIsLoading(true);
      // لو نجح مجرد ارسال طلب لانشاء الحساب
      abortControllerRef.current = new AbortController();
      try {
        const res = await fetch(`/api/register`, {
          method: "POST",
          signal: abortControllerRef?.current?.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        // الرد على طلب انشاء الحساب
        const data = await res.json();

        // لو نجح انشاء الحساب
        if (data.status === 201) {
          setSuccessRegister(true);
          // نبعت طلب تسجيل دخول
          const loginRes = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });

          // لو نحج تسجيل الدخول
          if (loginRes.ok) {
            router.replace(sessionStorage.getItem("prevPath" || "/"));
            router.refresh();
          }

          // لو منجحش تسجيل الدخول
          else {
            setAlert({
              isVisible: true,
              message: "success register but login failed",
              isSuccess: false,
            });
            router.replace("/login");
            router.refresh();
          }

          // لو منجحش انشاء الحساب
        } else {
          setIsLoading(false);
          setAlert({
            isVisible: true,
            message: data.message,
            isSuccess: false,
          });
          emailFocusInterval = setTimeout(() => {
            emailRef.current?.focus();
          }, 10);
        }
      } catch (err) {
        // لو منجحش مجرد ارسال طلب لانشاء الحساب
        console.log(err);
        if (err.name === "AbortError") {
          setAlert({
            isVisible: true,
            message: "لقد ألغيت العملية",
            isSuccess: false,
          });
        } else {
          setAlert({
            isVisible: true,
            message: "النت, جرب تاني",
            isSuccess: false,
          });
        }
        setIsLoading(false); // تمام دي
      }
    }
  }

  // auto focus on name input
  useEffect(() => {
    const nameFocusInterval = nameRef.current.focus();

    return () => {
      clearTimeout(emailFocusInterval);
      clearTimeout(nameFocusInterval);
    };
  }, []);

  // دالة الإلغاء
  function cancelLoginHandler() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // قطع الطلب
    }
    setIsLoading(false); // إخفاء اللودر فوراً
  }

  return (
    // الحاوية الخارجية
    <div className="min-h-dscreen bg-[#f8f9fa] flex items-center justify-center p-4 py-12">
      <div
        className={`bg-white w-full max-w-137.5 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f1f1] p-8 md:p-12 ${!isLoading && "select-none"}`}
      >
        <div className="text-center mb-8">
          <h1 className="text-[#1a2b4b] text-3xl md:text-4xl font-bold mb-3">
            Create New Account
          </h1>
          <p className="text-[#71717a] text-sm md:text-base">
            Join us and start your journey today
          </p>
        </div>
        <fieldset
          disabled={isLoading}
          className={`relative p-8  ${isLoading && "pointer-events-none select-none "} `}
        >
          <form className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="text-[#1a2b4b] font-semibold text-sm ml-1"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="ex- Taha Ebrahim Mahmoud"
                className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5"
                id="fullname"
                required
                ref={nameRef}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label
                className="text-[#1a2b4b] font-semibold text-sm ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5"
                id="email"
                required
                ref={emailRef}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2 relative">
              <label
                className="text-[#1a2b4b] font-semibold text-sm ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 pl-6 pr-13 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5 disabled:cursor-not-allowed"
                id="password"
                maxLength={14}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute top-[50%] right-4 cursor-pointer "
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="space-y-2 relative">
              <label
                className="text-[#1a2b4b] font-semibold text-sm ml-1"
                htmlFor="re-password"
              >
                Confirm Password
              </label>

              <div className="relative mt-1.5 flex items-center group">
                <input
                  type="text" // نستخدم text دائماً للتحكم في العرض اليدوي
                  autoComplete="off"
                  placeholder={formData.passwordR ? "" : "Retype your password"}
                  className="w-full bg-[#f4f7fa] border-none rounded-2xl py-4 px-6 
                 text-transparent caret-sky-600 focus:ring-2 focus:ring-sky-600 
                 outline-none transition-all placeholder:text-gray-400 font-mono text-[16px]"
                  id="re-password"
                  required
                  maxLength={14}
                  value={formData.passwordR}
                  onChange={(e) =>
                    setFormData({ ...formData, passwordR: e.target.value })
                  }
                />

                {/* طبقة الـ Spans الاحترافية */}
                <div className="absolute left-6 inset-y-0 flex items-center pointer-events-none font-mono text-[16px]">
                  {passwordRArr.map((letter, idx) => {
                    const isCorrect = letter === passwordArr[idx];
                    const isSpace = letter === " ";

                    return (
                      <span
                        key={idx}
                        className={`
              relative flex items-center justify-center transition-all duration-200
              w-[9.6px] /* العرض الدقيق لحرف المونو */
              ${showPasswordR ? "text-[16px] font-bold" : ""}
              ${isCorrect ? "text-green-500" : "text-red-500"}
            `}
                      >
                        {showPasswordR ? (
                          <>
                            {letter === " " ? "\u00A0" : letter}
                            {/* تمييز المسافة الخاطئة بخط سفلي أو خلفية */}
                            {isSpace && !isCorrect && (
                              <span className="absolute bottom-2 inset-x-0 h-1 bg-red-500/40 rounded-full animate-pulse" />
                            )}
                          </>
                        ) : (
                          <span
                            className={`w-2 h-2 rounded-full transition-transform duration-300 
                  ${isCorrect ? "bg-green-500 shadow-[0_0_5px_#22c55e]" : "bg-red-500 shadow-[0_0_5px_#ef4444]"}
                  scale-110
                `}
                          />
                        )}
                      </span>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="absolute right-4 text-gray-400 hover:text-sky-600 transition-colors cursor-pointer"
                  onClick={() => setShowPasswordR((prev) => !prev)}
                >
                  {showPasswordR ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-[#1c2645] text-white font-bold py-4 rounded-2xl mt-6 transition-colors shadow-lg shadow-blue-900/10 cursor-pointer hover:bg-blue-800 ${isLoading && "cursor-wait bg-[#1c2645]"}`}
              onClick={(e) => registerHandler(e)}
              disabled={isLoading}
              dir="rtl"
            >
              {isLoading ? "جار انشاء حسابك..." : "انشاء حساب"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f1f1f1]"></div>
            </div>
            <span className="relative bg-white px-4 text-[#71717a] text-sm font-medium">
              or Register with
            </span>
          </div>

          <div className="grid grid-cols-1  gap-3">
            <button className="cursor-not-allowed flex items-center justify-center gap-2 bg-[#f4f7fa] py-4 rounded-2xl hover:bg-[#eceff3] transition-colors group border border-transparent hover:border-[#e2e8f0]">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span className="text-[#1a2b4b] font-semibold text-sm whitespace-nowrap">
                Google
              </span>
            </button>
          </div>

          <div className="text-center mt-10">
            <p className="text-[#71717a] text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                Sign In Now!
              </Link>
            </p>
          </div>
        </fieldset>
      </div>
      {isLoading && (
        <Loader
          cancelOperation={successRegister ? cancelLoginHandler : undefined}
        />
      )}
    </div>
  );
}
