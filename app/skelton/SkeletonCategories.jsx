export default function SkeletonCategories() {
  return Array.from({ length: 10 }).map((_, idx) => (
    <section
      className="flex flex-col items-center gap-2 animate-pulse"
      key={idx}
    >
      <div className="w-25 h-25 bg-gray-200 rounded-[50%]"></div>
      <p className="w-25 h-1.5 rounded-xl bg-gray-200 mt-3"></p>
      <p className="w-25 h-1.5 rounded-xl bg-gray-200"></p>
    </section>
  ));
}
