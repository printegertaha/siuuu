"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useProgressBar } from "@/app/_context/ProgressBarCTX";
import { useAlertMsg } from "@/app/_context/AlertMsgContext";
import Loader from "../Loader";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsProgressBarVisible } = useProgressBar();
  const { setAlert } = useAlertMsg();
  let runProgressBarTimeout;
  let emailFocusInterval;

  async function loginHandler(e) {
    e.preventDefault();

    // handle submit
    if (
      emailRef.current?.value?.length >= 3 &&
      passwordRef.current?.value?.length >= 8 &&
      emailRef.current.value.includes("@")
    ) {
      try {
        setIsLoading(true);
        const res = await signIn("credentials", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          redirect: false,
        });
        if (res.ok) {
          setIsProgressBarVisible(true);
          runProgressBarTimeout = setTimeout(() => {
            router.replace(sessionStorage.getItem("prevPath") || "/");
            router.refresh();
          }, 100);
        }
        // هنا اي حاله غير النجاح هتتنفذ
        else {
          true;
          setIsLoading(false);
          setAlert({
            isVisible: true,
            message: "بياناتك مش تمام",
            isSuccess: false,
          });
          passwordRef.current.value = "";
          emailFocusInterval = setTimeout(() => {
            emailRef?.current?.focus();
          }, 10);
          console.log(`error from else: ${res.error}`);
        }
      } catch (err) {
        // catch بترجع خطأ تقني بمعنى ان لو رجع 401 او 500 مثلا دا مش هيعتبر خطأ
        setAlert({
          isVisible: true,
          message: "حصل خطأ, جرب تاني",
          isSuccess: false,
        });
        setIsLoading(false);
        console.log(`error from catch in login handler function: ${err}`);
      }
    } else if (
      emailRef.current.value.length < 3 ||
      !emailRef.current.value.includes("@")
    ) {
      setAlert({
        isVisible: true,
        message: "اكتب الايميل",
        isSuccess: false,
      });
    } else if (passwordRef.current.value.length < 8) {
      setAlert({
        isVisible: true,
        message: "الباسورد",
        isSuccess: false,
      });
    }
  }

  // auto input focus
  useEffect(() => {
    const oneEmailFocusInterval = emailRef.current.focus();
    return () => {
      clearTimeout(runProgressBarTimeout);
      clearTimeout(emailFocusInterval);
      clearTimeout(oneEmailFocusInterval);
    };
  }, []);

  return (
    <div className={` bg-[#f8f9fa] flex justify-center p-4  py-8 relative `}>
      <div className="bg-white max-w-[80dvw] xl:max-w-[70dvw] 2xl:max-w-[50dvw] rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f1f1] p-8 md:p-12">
        <div className="text-center mb-10">
          <h2 className="text-[#1a2b4b] text-xl font-black md:text-3xl lg:text-4xl xl:text-5xl mb-3">
            Sign In to Your Account
          </h2>

          <p className="text-[#71717a] text-sm md:text-xl lg:text-2xl xl:text-3xl">
            Enter your detail below
          </p>
        </div>

        <fieldset
          disabled={isLoading}
          className={`${isLoading && "pointer-events-none"}`}
        >
          <form
            className="space-y-5"
            onSubmit={(e) => loginHandler(e)}
            noValidate
          >
            <div className="space-y-2">
              <label
                className="text-[#1a2b4b] font-semibold text-sm ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full bg-[#f4f7fa] border-none rounded-4xl py-4 px-6 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5 disabled:cursor-not-allowed"
                id="email"
                ref={emailRef}
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
                className="w-full bg-[#f4f7fa] border-none rounded-4xl py-4 pl-6 pr-13 text-[#71717a] focus:ring-2 focus:ring-sky-600 outline-none transition-all placeholder:text-gray-400 mt-1.5 disabled:cursor-not-allowed"
                id="password"
                ref={passwordRef}
              />
              <button
                type="button"
                className="absolute top-[50%] right-4 cursor-pointer disabled:cursor-not-allowed"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1c2645] text-white font-bold py-4 rounded-2xl mt-4 capitalize transition-colors shadow-lg shadow-blue-900/10 cursor-pointer hover:bg-blue-800 disabled:bg-gray-500 disabled:cursor-wait"
              disabled={isLoading}
            >
              {isLoading ? (
                <div dir="rtl" className="flex items-center justify-center gap-2">
                  جار تسجيل الدخول...
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <button className="text-[#a1a1aa] text-sm hover:text-[#1c2645] transition-colors">
              Forgot your password?
            </button>
          </div>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#f1f1f1]"></div>
            </div>
            <span className="relative bg-white px-4 text-[#71717a] text-sm font-medium">
              Or Sign in with
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
              Do not have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 font-bold hover:underline"
              >
                Register Now!
              </Link>
            </p>
          </div>
        </fieldset>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
