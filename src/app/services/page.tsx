"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaIcons } from "react-icons/fa6";
import { useBarber } from "../_context/BarberContextProvider";

export default function ServicesPage() {
    const { services } = useBarber();
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Link
          href="/"
          className="absolute top-5 left-30 md:top-0 md:left-4 z-50 flex items-center gap-2 text-white hover:text-primary/80 transition-all duration-300"
        >
          <span>الرجوع إلي الرئيسية</span>
          <span>
            <FaArrowLeft />
          </span>
        </Link>
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            خدماتنا الاحترافية
          </span>

          <h1 className="mb-6 text-4xl font-extrabold md:text-6xl">
            خدمات صالون سيف حازم
          </h1>

          <p className="text-lg leading-8 text-muted-foreground">
            نقدم لك تجربة حلاقة متكاملة بأعلى جودة، مع اهتمام بأدق التفاصيل
            للحصول على أفضل إطلالة.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <FaIcons className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-bold">{service.nameAr}</h3>

                <p className="mb-6 leading-7 text-muted-foreground">
                  {service.durationMinutes} دقيقة
                </p>

                {/* Features */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="h-4 w-4 text-primary" />
                    <span>خدمة احترافية</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="h-4 w-4 text-primary" />
                    <span>أدوات معقمة</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <FaCheckCircle className="h-4 w-4 text-primary" />
                    <span>أفضل جودة</span>
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between border-t border-border pt-5">
                  <span className="text-2xl font-extrabold text-primary">
                    {service.price} جنيه
                  </span>

                  <Link
                    href="/booking"
                    className="rounded-xl bg-primary px-5 py-2 font-bold text-black transition-all duration-300 hover:scale-105 hover:opacity-90 z-10"
                  >
                    احجز الآن
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
