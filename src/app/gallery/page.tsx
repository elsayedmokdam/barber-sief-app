"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaCamera, FaScissors, FaStar, FaArrowLeft } from "react-icons/fa6";
import image1 from "@/assets/images/seif.jpeg";
import image2 from "@/assets/images/image1.jpeg";
import image3 from "@/assets/images/image3.jpeg";
import image4 from "@/assets/images/image4.jpeg";
import image5 from "@/assets/images/image5.jpeg";
import image6 from "@/assets/images/image6.jpeg";
import image7 from "@/assets/images/image7.jpeg";
import image8 from "@/assets/images/image8.jpeg";
import image9 from "@/assets/images/image9.jpeg";

import Link from "next/link";
import BackToHomeBtn from "@/components/back-to-home-btn/BackToHomeBtn";

const galleryImages = [
  {
    id: 1,
    image: image1,
    title: "ستايل احترافي",
    category: "قصات شعر",
  },
  {
    id: 2,
    image: image2,
    title: "ستايل احترافي",
    category: "العناية بالذقن",
  },
  {
    id: 3,
    image: image3,
    title: "ستايل عصري",
    category: "قصات حديثة",
  },
  {
    id: 4,
    image: image4,
    title: "اهتمام بالتفاصيل",
    category: "أجهزة حديثة",
  },
  {
    id: 5,
    image: image5,
    title: "قصات شبابية",
    category: "ستايل",
  },
  {
    id: 6,
    image: image6,
    title: "تصفيف شعر",
    category: "ستايل",
  },
  {
    id: 7,
    image: image7,
    title: "حلاقة أطفال",
    category: "ستايل",
  },
  {
    id: 8,
    image: image8,
    title: "حلاقة كلاسيكية",
    category: "ستايل",
  }
];

export default function GalleryPage() {
  return (
    <main className="relative max-w-7xl mx-auto overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        {/* Back Button */}
        <BackToHomeBtn />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur-xl">
            <FaCamera className="text-primary" />

            <span className="text-sm text-muted-foreground">
              معرض الأعمال والقصات
            </span>
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight md:text-6xl">
            لمسات احترافية
            <span className="block text-primary">وأناقة في كل تفصيلة</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
            شاهد مجموعة من أفضل القصات والخدمات داخل المحل، بأحدث الأساليب
            العصرية ولمسة احترافية تمنحك إطلالة مميزة.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-medium text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105"
            >
              احجز الآن
              <FaArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/services"
              className="rounded-2xl border border-border bg-card/60 px-6 py-3 font-medium backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-primary/10"
            >
              مشاهدة الخدمات
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              icon: <FaScissors />,
              title: "2500+",
              subtitle: "حلاقة احترافية",
            },
            {
              icon: <FaStar />,
              title: "4.9",
              subtitle: "تقييم العملاء",
            },
            {
              icon: <FaCamera />,
              title: "120+",
              subtitle: "ستايل مختلف",
            },
            {
              icon: "🔥",
              title: "100%",
              subtitle: "رضا العملاء",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="
                rounded-3xl
                border
                border-border/50
                bg-card/60
                p-5
                text-center
                backdrop-blur-xl
                shadow-lg
              "
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                {item.icon}
              </div>

              <h3 className="text-2xl font-black">{item.title}</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black">معرض الصور</h2>

            <p className="mt-2 text-muted-foreground">
              أحدث القصات وأفضل النتائج داخل المحل
            </p>
          </div>

          <div className="hidden rounded-2xl border border-border bg-card/50 px-4 py-2 backdrop-blur-xl md:block">
            <span className="text-sm text-muted-foreground">
              {galleryImages.length} صورة
            </span>
          </div>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="
                group
                relative
                mb-5
                overflow-hidden
                rounded-3xl
                border
                border-border/40
                bg-card/60
                shadow-xl
              "
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.title}
                  width={1200}
                  height={1600}
                  className="
                    h-auto
                    w-full
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-linear-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                    opacity-100
                    transition-all
                    duration-500
                    lg:group-hover:opacity-100
                  "
                />

                {/* Content */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    -translate-y-5
                    lg:translate-y-20
                    p-5
                    opacity-100
                    transition-all
                    duration-500
                    lg:group-hover:-translate-y-5
                    lg:group-hover:opacity-100
                  "
                >
                  <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    {image.category}
                  </span>

                  <h3 className="text-xl font-bold text-white">
                    {image.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
