"use client";
import { motion } from "motion/react";
import { format } from "date-fns";
import { useState } from "react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { Booking } from "@/types";
import { Invoice } from "../invoice/Invoice";
import BookingCard from "../booking-card/BookingCard";

// Ordered chronologically: noon → midnight → early morning
// Must match the slots defined in BarberContextProvider
const TIME_SLOT_ORDER = [
  "01:00 م",
  "01:30 م",
  "02:00 م",
  "02:30 م",
  "03:00 م",
  "03:30 م",
  "04:00 م",
  // "04:30 م",  // Remove this line
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
];

export function BookingsList() {
  const { bookings, deleteBooking } = useBarber();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Deduplicate bookings by ID to prevent duplicate cards
  const uniqueBookings = Array.from(
    new Map(bookings.map((booking) => [booking.id, booking])).values()
  );

  const sortedBookings = [...uniqueBookings].sort((a, b) => {
    // Sort by date first
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    // Sort by chronological time slot order (not alphabetically)
    const aIndex = TIME_SLOT_ORDER.indexOf(a.timeSlot);
    const bIndex = TIME_SLOT_ORDER.indexOf(b.timeSlot);
    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }
    // Fall back to creation time if same slot
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
