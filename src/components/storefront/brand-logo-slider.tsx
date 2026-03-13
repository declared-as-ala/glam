"use client";

import Link from "next/link";
import Slider from "react-slick";

export function BrandLogoSlider({
  brands,
}: {
  brands: Array<{ _id: string; name: string; slug: string }>;
}) {
  return (
    <Slider
      dots={false}
      infinite
      speed={500}
      slidesToShow={6}
      slidesToScroll={1}
      autoplay
      arrows={false}
      autoplaySpeed={3000}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 640, settings: { slidesToShow: 2 } },
      ]}
    >
      {brands.map((brand) => (
        <div key={brand._id} className="px-3">
          <Link
            href={`/marque/${brand.slug}`}
            className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 shadow-sm transition hover:border-[#3AB7A5] hover:shadow-md"
          >
            <span className="text-lg font-semibold text-gray-700">{brand.name}</span>
          </Link>
        </div>
      ))}
    </Slider>
  );
}
