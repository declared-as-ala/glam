import Link from "next/link";

export function EmptyState({
  title,
  description,
  href = "/shop",
  actionLabel = "Explorer la boutique",
}: {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white p-10 text-center">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-gray-600">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex rounded-full bg-[#3AB7A5] px-6 py-3 font-semibold text-white"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
