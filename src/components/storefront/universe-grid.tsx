import Image from "next/image";
import Link from "next/link";

export function UniverseGrid({
  banners,
}: {
  banners: Array<{
    title?: string;
    description?: string;
    image?: string;
    link?: string;
    accentColor?: string;
  }>;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {banners.map((banner, index) => (
        <Link
          key={`${banner.title}-${index}`}
          href={banner.link || "/shop"}
          className="group relative block h-72 overflow-hidden rounded-[1.75rem]"
        >
          <Image
            src={banner.image || "https://images.unsplash.com/photo-1596642748852-5596416147ac?w=1200&auto=format&fit=crop&q=80"}
            alt={banner.title || "Univers GLAM"}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, ${banner.accentColor || "#3AB7A5CC"} 0%, transparent 100%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="max-w-sm text-white">
              <h3 className="text-3xl font-bold">{banner.title}</h3>
              <p className="mt-3 text-white/90">{banner.description}</p>
              <span className="mt-5 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-gray-900">
                Decouvrir
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
