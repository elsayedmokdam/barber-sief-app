"use client";

import { useMemo, useState } from "react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendar, FaMagnifyingGlass } from "react-icons/fa6";
import BookingCard from "../booking-card/BookingCard";
import { Booking } from "@/types";
import { Invoice } from "../invoice/Invoice";
import { formatTime } from "@/lib/helpers/formatTime";
import { format } from "date-fns";

// ترتيب الأوقات الصحيح
const TIME_SLOT_ORDER = [
  "01:00 م",
  "01:30 م",
  "02:00 م",
  "02:30 م",
  "03:00 م",
  "03:30 م",
  "04:00 م",
  "04:30 م",
  "05:00 م",
  "05:30 م",
  "06:00 م",
  "06:30 م",
  "07:00 م",
  "07:30 م",
  "08:00 م",
  "08:30 م",
  "09:00 م",
  "09:30 م",
  "10:00 م",
  "10:30 م",
  "11:00 م",
  "11:30 م",
  "12:00 ص",
  "12:30 ص",
  "01:00 ص",
  "01:30 ص",
  "02:00 ص",
  "02:30 ص",
  "03:00 ص",
  "03:30 ص",
  "04:00 ص",
  "04:30 ص",
  "05:00 ص",
  "05:30 ص",
  "06:00 ص",
];

export default function BookingSearchInput() {
  const { bookings } = useBarber();

  const [query, setQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // ترتيب الحجوزات بشكل صحيح
  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      // ترتيب بالتاريخ
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }

      // ترتيب بالوقت الحقيقي
      const aIndex = TIME_SLOT_ORDER.indexOf(a.timeSlot);
      const bIndex = TIME_SLOT_ORDER.indexOf(b.timeSlot);

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      // fallback
      return a.createdAt - b.createdAt;
    });
  }, [bookings]);

  // حجوزات اليوم فقط
  const today = format(new Date(), "yyyy-MM-dd");

  const todayBookings = useMemo(() => {
    return sortedBookings.filter((booking) => booking.date === today);
  }, [sortedBookings, today]);

  // نتائج البحث
  const filteredBookings = useMemo(() => {
    if (!query.trim()) return [];

    return todayBookings.filter((booking) => {
      return (
        booking.customerName.toLowerCase().includes(query.toLowerCase()) ||
        booking.phoneNumber.includes(query)
      );
    });
  }, [query, todayBookings]);

  const currentBooking = filteredBookings[0] ?? null;

  // حساب الدور الحالي
  const currentTurn = currentBooking
    ? todayBookings.findIndex((booking) => booking.id === currentBooking.id) + 1
    : 0;

  // حساب الوقت المتوقع
  const estimatedMinutes = currentBooking
    ? todayBookings.slice(0, currentTurn - 1).reduce((total, booking) => {
        return (
          total +
          booking.services.reduce(
            (sum, service) => sum + service.durationMinutes,
            0,
          )
        );
      }, 0)
    : 0;

  const formattedEstimatedTime =
    estimatedMinutes > 0 ? `${estimatedMinutes}` : "";

  return (
    <>
      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 shadow-lg">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <FaCalendar className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold">ابحث عن حجز</h2>

            <p className="text-sm text-muted-foreground">
              اكتب اسم أو رقم هاتف لمعرفة الدور
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <FaMagnifyingGlass className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: محمد أحمد أو 010xxxxxxxx"
            aria-label="البحث عن الحجز"
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background/80
              py-4
              pr-12
              pl-4
              text-foreground
              outline-none
              transition-all
              duration-300
              focus:border-primary
              focus:ring-2
              focus:ring-primary/30
              hover:border-primary/50
            "
          />
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {query.trim() && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              {/* Stats */}
              <div className="mb-4 grid gap-4 rounded-2xl border border-border/50 bg-muted/30 px-4 py-3 backdrop-blur-sm sm:grid-cols-[1.5fr_1fr]">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaCalendar className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">نتائج البحث</p>

                    <h3 className="font-semibold">
                      تم العثور على {filteredBookings.length} حجز
                    </h3>
                  </div>
                </div>

                {filteredBookings.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-primary/10 px-4 py-3 text-primary">
                      <p className="mb-1 text-center text-xs opacity-80">
                        دورك الحالي
                      </p>

                      <p className="text-center text-2xl font-bold">
                        {currentTurn}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-lg">
                      <p className="mb-1 text-center text-xs opacity-80">
                        الوقت المقدر للدور
                      </p>

                      <p className="text-center text-base font-semibold">
                        {formattedEstimatedTime
                          ? formatTime(formattedEstimatedTime)
                          : "الآن"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Empty State */}
              {filteredBookings.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="
                    rounded-2xl
                    border
                    border-dashed
                    border-border
                    bg-muted/30
                    py-10
                    text-center
                  "
                >
                  <p className="mb-2 text-lg font-semibold">
                    لا توجد حجوزات مطابقة
                  </p>

                  <p className="text-sm text-muted-foreground">
                    تأكد من كتابة الاسم أو رقم الهاتف بشكل صحيح
                  </p>
                </motion.div>
              ) : (
                <motion.div layout className="flex flex-col gap-4">
                  {filteredBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id || index}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BookingCard
                        booking={booking}
                        setSelectedBooking={setSelectedBooking}
                        index={todayBookings.findIndex(
                          (b) => b.id === booking.id,
                        )}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedBooking && (
        <Invoice
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
}
