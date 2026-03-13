import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SectionHeading({
  title,
  subtitle,
  href,
  actionLabel = "Voir tout",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle ? <p className="mt-2 text-gray-600">{subtitle}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#3AB7A5] transition hover:text-[#2d9687]"
        >
          {actionLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
