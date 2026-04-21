import Link from "next/link";

export default function Favorites() {
  return (
    <div
      dir="rtl"
      className="min-h-[calc(100dvh-80px)] flex flex-col items-center justify-center mx-[3%]"
    >
      <p className="font-bold text-xl">مفيش مفلضات لسه هنا يا حبيبي.</p>
      <Link href="/" className=" text-blue-400 text-sm">
        رجعني للصفحة الرئيسية
      </Link>
    </div>
  );
}

// اعمل صناديق الاشعارات والسله
