import BackToHomeBtn from "@/components/back-to-home-btn/BackToHomeBtn";
import { BookingForm } from "@/components/booking-form/BookingForm";
import ImportantInfo from "@/components/important-info/ImportantInfo";

export default function BookingPage() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      {/* Back Button */}
      <BackToHomeBtn />
      {/* Heading */}
      <div className="mb-12 text-center">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          احجز موعدك الآن
        </span>

        <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
          حجز المواعيد
        </h1>

        <p className="mx-auto max-w-2xl text-muted-foreground">
          اختر الوقت المناسب لك مسبقا و قم بتوفير وقت الانتظار.
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
