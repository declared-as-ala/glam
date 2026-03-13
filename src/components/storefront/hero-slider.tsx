"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

type HeroSlide = {
  _id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  desktopImage: string;
};

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  return (
    <Slider
      dots
      infinite
      arrows={false}
      autoplay
      autoplaySpeed={5000}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      className="hero-slider"
    >
      {slides.map((slide) => (
        <div key={slide._id}>
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#FFF8F3] to-[#FFE8E0] md:h-[520px]">
            <Image
              src={slide.desktopImage}
              alt={slide.title}
              fill
              className="object-cover object-center opacity-80"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent" />
            <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-8 md:px-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#3AB7A5]">
                GLAM Parapharmacie
              </p>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                {slide.title}
              </h1>
              {slide.subtitle ? (
                <p className="mt-4 max-w-lg text-lg text-gray-600">{slide.subtitle}</p>
              ) : null}
              {slide.ctaText ? (
                <Link
                  href={slide.ctaLink ?? "/shop"}
                  className="mt-8 inline-flex w-fit rounded-full bg-[#3AB7A5] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#2d9687]"
                >
                  {slide.ctaText}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
