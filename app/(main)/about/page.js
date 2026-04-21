import Link from "next/link";

export default function page() {
  return (
    <div className="h-[calc(100dvh-80px)] flex flex-col items-center justify-center mx-[3%]">
      <p className="text-xl font-bold text-center">
        يعم لسه تحت الانشاء مستعجل على ايه؟
      </p>
      <Link href="/" className="text-center text-sm font-light text-blue-400">
        رجعني للصفحة الرئيسية
      </Link>
    </div>
  );
}
