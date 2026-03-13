import Image from "next/image";
import Link from "next/link";

export function FeaturedBrandsGrid({
  brands,
}: {
  brands: Array<{
    _id: string;
    name: string;
    slug: string;
    shortText?: string;
    bannerImage?: string;
  }>;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {brands.slice(0, 4).map((brand) => (
        <Link
          key={brand._id}
          href={`/marque/${brand.slug}`}
          className="group relative block h-80 overflow-hidden rounded-[1.5rem]"
        >
          <Image
            src={
              brand.bannerImage ||
              "https://images.unsplash.com/photo-1680461494862-754e01607c83?w=1200&auto=format&fit=crop&q=80"
            }
            alt={brand.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <h3 className="text-2xl font-bold">{brand.name}</h3>
            <p className="mt-2 text-sm text-white/90">{brand.shortText}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
