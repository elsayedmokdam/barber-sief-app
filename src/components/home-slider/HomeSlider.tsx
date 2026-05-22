"use client";

import Image from "next/image";
import Link from "next/link";
import seif from "@/assets/images/seif.jpeg";
import slider1 from "@/assets/images/image3.jpeg";
import slider2 from "@/assets/images/image4.jpeg";
import { motion } from "framer-motion";
import Slider from "../slider/Slider";

const slides = [
  {
    image: seif,
    title: "أحدث القصات الرجالية",
    subtitle: "إطلالة عصرية بأيدي محترفة",
  },
  {
    image: slider1,
    title: "تجربة حلاقة استثنائية",
    subtitle: "راحة، دقة، وأناقة في كل تفصيلة",
  },
  {
    image: slider2,
    title: "قصات حديثة",
    subtitle: "تجربة حلاقة استثنائية",
  }
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
          <div
            key={index}
            className="relative h-[80vh] min-h-80 w-full overflow-hidden"
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              quality={100}
              className="
        object-contain
        object-center
        scale-105
        transition-transform
        duration-12000
        ease-linear
        hover:scale-110
      "
            />

            {/* Main Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Premium Gradient Overlay */}
            <div
              className="
        absolute
        inset-0
        bg-linear-to-r
        from-black/90
        via-black/60
        to-black/20
      "
            />

            {/* Gold Glow Effect */}
            <div
              className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.15),transparent_35%)]
      "
            />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/10
              px-5
              py-2
              backdrop-blur-xl
              shadow-lg
            "
                  >
                    <span className="text-sm font-medium text-white">
                      ✨ أفضل صالون رجالي في المنطقة
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="
              text-5xl
              font-black
              leading-tight
              text-white
              md:text-7xl
            "
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="
              mt-6
              max-w-2xl
              text-lg
              leading-9
              text-gray-200
              md:text-xl
            "
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-10 flex flex-wrap gap-4"
                  >
                    {/* Primary Button */}
                    <Link
                      href="/booking"
                      className="
                group
                relative
                overflow-hidden
                rounded-2xl
                bg-primary
                px-8
                py-4
                text-lg
                font-bold
                text-primary-foreground
                shadow-2xl
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-primary/40
              "
                    >
                      <span className="relative z-10">احجز موعد الآن</span>

                      <div
                        className="
                  absolute
                  inset-0
                  translate-y-full
                  bg-white/20
                  transition-transform
                  duration-300
                  group-hover:translate-y-0
                "
                      />
                    </Link>

                    {/* Secondary */}
                    <Link
                      href="/services"
                      className="
                rounded-2xl
                border
                border-white/20
                bg-white/10
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white/20
              "
                    >
                      خدماتنا
                    </Link>

                    {/* Gallery */}
                    <Link
                      href="/gallery"
                      className="
                rounded-2xl
                border
                border-white/20
                bg-white/10
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white/20
              "
                    >
                      بعض أعمالنا
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Bottom Fade */}
            <div
              className="
        absolute
        bottom-0
        left-0
        right-0
        h-40
        bg-linear-to-t
        from-background
        to-transparent
      "
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
