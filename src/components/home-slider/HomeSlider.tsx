"use client";

import Image from "next/image";
import Link from "next/link";
import slider1 from "@/assets/images/slider.png";
import Slider from "../slider/Slider";

const slides = [
  {
    image: slider1,
    title: "أحدث القصات الرجالية",
    subtitle: "إطلالة عصرية بأيدي محترفة",
  },
  {
    image: slider1,
    title: "تجربة حلاقة استثنائية",
    subtitle: "راحة، دقة، وأناقة في كل تفصيلة",
  },
];

export default function HomeSlider() {
  return (
    <section className="relative overflow-hidden">
      <Slider
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{
          clickable: true,
        }}
        className="h-[75vh] min-h-125 w-full"
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[75vh] min-h-125 w-full">
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
                <div className="max-w-2xl space-y-6">
                  {/* Small Badge */}
                  <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <span className="text-sm text-white">
                      ✨ أفضل صالون رجالي
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-lg leading-8 text-gray-200 md:text-xl">
                    {slide.subtitle}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link
                      href="/booking"
                      className="rounded-xl bg-primary px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:opacity-90"
                    >
                      احجز موعد
                    </Link>

                    <Link
                      href="/services"
                      className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                    >
                      خدماتنا
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
