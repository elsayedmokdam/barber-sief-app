"use client";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { motion } from "motion/react";
import { FaCalendar, FaClock, FaReceipt, FaTrash } from "react-icons/fa6";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { Booking } from "@/types";
export default function BookingCard({
  booking,
  index,
  deleteBooking,
  setSelectedBooking,
}: {
  booking: Booking;
  index: number;
  deleteBooking?: (id: string) => void;
  setSelectedBooking: (booking: Booking | null) => void;
}) {
  const {isOwner} = useBarber();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-102 hover:bg-accent/40! hover:text-accent-foreground!"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <h3 className="font-bold text-lg">{booking.customerName}</h3>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <FaCalendar className="w-4 h-4" />
              {format(new Date(booking.date), "EEEE، dd MMMM yyyy", {
                locale: arSA,
              })}
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4" />
              {booking.timeSlot}
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              {booking.phoneNumber}
            </div>
          </div>

          <div className="mb-2">
            <p className="text-sm font-medium mb-1">الخدمات:</p>
            <div className="flex flex-wrap gap-2">
              {booking.services.map((service) => (
                <span
                  key={service.id}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm"
                >
                  {service.nameAr}
                </span>
              ))}
            </div>
          </div>

          {booking.additionalNotes && (
            <div className="text-sm text-muted-foreground bg-muted p-2 rounded-lg">
              <p className="font-medium">ملاحظات:</p>
              <p>{booking.additionalNotes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-left">
            <p className="text-2xl font-bold text-primary">
              {booking.totalCost} EG
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedBooking(booking)}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
              title="طباعة الفاتورة"
            >
              <FaReceipt className="w-4 h-4" />
            </button>
            {isOwner && (
              <button
                onClick={() => deleteBooking!(booking.id)}
                className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all duration-300 hover:scale-110"
                title="حذف الحجز"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
