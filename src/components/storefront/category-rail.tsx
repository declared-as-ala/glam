import Link from "next/link";

export function CategoryRail({
  categories,
}: {
  categories: Array<{ _id: string; name: string; slug: string; icon?: string }>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-9">
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/categorie/${category.slug}`}
          className="flex flex-col items-center gap-3 rounded-[1.5rem] bg-gray-50 p-4 text-center transition hover:-translate-y-1 hover:bg-[#3AB7A5]/10 hover:shadow-md"
        >
          <div className="text-4xl">{category.icon ?? "🧴"}</div>
          <span className="text-xs font-medium text-gray-700">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
