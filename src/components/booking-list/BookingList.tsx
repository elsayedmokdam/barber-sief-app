"use client";
import { motion } from "motion/react";
import { format } from "date-fns";
import { useState } from "react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { Booking } from "@/types";
import { Invoice } from "../invoice/Invoice";
import BookingCard from "../booking-card/BookingCard";

export function BookingsList() {
  const { bookings, deleteBooking } = useBarber();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const sortedBookings = [...bookings].sort((a, b) => {
    // Sort by date first, then by time slot, then by creation time
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    if (a.timeSlot !== b.timeSlot) {
      return a.timeSlot.localeCompare(b.timeSlot);
    }
    return a.createdAt - b.createdAt;
  });

  const todayBookings = sortedBookings.filter(
    (b) => b.date === format(new Date(), "yyyy-MM-dd"),
  );
  const upcomingBookings = sortedBookings.filter(
    (b) => b.date > format(new Date(), "yyyy-MM-dd"),
  );

  return (
    <>
      <div className="space-y-6">
        {todayBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-lg"
          >
            <h2 className="mb-4">حجوزات اليوم ({todayBookings.length})</h2>
            <div className="space-y-3">
              {todayBookings.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  setSelectedBooking={setSelectedBooking}
                  deleteBooking={deleteBooking}
                />
              ))}
            </div>
          </motion.div>
        )}

        {upcomingBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-lg"
          >
            <h2 className="mb-4">
              الحجوزات القادمة ({upcomingBookings.length})
            </h2>
            <div className="space-y-3">
              {upcomingBookings.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  setSelectedBooking={setSelectedBooking}
                  deleteBooking={deleteBooking}
                />
              ))}
            </div>
          </motion.div>
        )}

        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-12 border border-border shadow-lg text-center"
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-muted-foreground">
              لا توجد حجوزات حالياً
            </h3>
          </motion.div>
        )}
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
