"use client";

import { useMemo, useState } from "react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendar, FaMagnifyingGlass } from "react-icons/fa6";
import BookingCard from "../booking-card/BookingCard";
import { Booking } from "@/types";
import { Invoice } from "../invoice/Invoice";
import { formatTime } from "@/lib/helpers/formatTime";

export default function BookingSearchInput() {
  const { bookings } = useBarber();

  const [query, setQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      if (a.timeSlot !== b.timeSlot)
        return a.timeSlot.localeCompare(b.timeSlot);
      return a.createdAt - b.createdAt;
    });
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (!query.trim()) return [];

    return sortedBookings.filter((booking) => {
      return (
        booking.customerName.toLowerCase().includes(query.toLowerCase()) ||
        booking.phoneNumber.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [query, sortedBookings]);

  const currentBooking = filteredBookings[0] ?? null;
  const currentTurn = currentBooking
    ? sortedBookings.findIndex((booking) => booking.id === currentBooking.id) +
      1
    : 0;
  const estimatedMinutes = currentBooking
    ? sortedBookings.slice(0, currentTurn - 1).reduce((total, booking) => {
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
    estimatedMinutes > 0 && `${estimatedMinutes}`;

  return (
    <>
      <div className="rounded-3xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <FaCalendar className="w-5 h-5" />
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
              <div className="grid gap-4 mb-4 rounded-2xl border border-border/50 bg-muted/30 px-4 py-3 backdrop-blur-sm sm:grid-cols-[1.5fr_1fr]">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FaCalendar className="w-4 h-4" />
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
                      <p className="text-xs opacity-80 mb-1 text-center">
                        دورك الحالي
                      </p>
                      <p className="text-2xl font-bold text-center">
                        {currentTurn}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-lg">
                      <p className="text-xs opacity-80 mb-1 text-center">
                        الوقت المقدر للدور
                      </p>
                      <p className="text-base font-semibold text-center">
                        {formatTime(formattedEstimatedTime  || "")}
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
                  <p className="text-lg font-semibold mb-2">
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
                        index={sortedBookings.findIndex(
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
