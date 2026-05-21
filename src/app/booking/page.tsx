import { BookingForm } from "@/components/booking-form/BookingForm";
import ImportantInfo from "@/components/important-info/ImportantInfo";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function BookingPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      {/* Back Button */}
      <div className="mb-10 flex justify-center md:justify-end">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-lg"
        >
          <span>الرجوع إلى الرئيسية</span>
          <FaArrowLeft className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      {/* Heading */}
      <div className="mb-12 text-center">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          احجز موعدك الآن
        </span>

        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          حجز المواعيد
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground">
          اختر الوقت المناسب لك واحصل على تجربة حلاقة احترافية بأعلى جودة.
        </p>
      </div>

      {/* Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <BookingForm />
        </div>

        <ImportantInfo />
      </div>
    </section>
  );
}
