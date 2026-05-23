"use client";

import { useState } from "react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { motion } from "motion/react";
import {
  FaCalendar,
  FaClock,
  FaReceipt,
  FaTrash,
  FaLock,
} from "react-icons/fa6";

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
  const { isOwner } = useBarber();

  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState("");

  const handleOpenInvoice = () => {
    // لو Owner افتح الفاتورة مباشرة
    if (isOwner) {
      setSelectedBooking(booking);
      return;
    }

    // لو مش Owner افتح input التحقق
    setShowPhoneInput(true);
  };

  const handleVerifyPhone = () => {
    const normalizedInput = phoneValue.trim();
    const normalizedPhone = booking.phoneNumber.trim();

    if (normalizedInput === normalizedPhone) {
      setError("");
      setSelectedBooking(booking);
      setShowPhoneInput(false);
      setPhoneValue("");
    } else {
      setError("رقم الهاتف غير صحيح");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border/60
        bg-card/70
        backdrop-blur-xl
        p-5
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-2xl
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-linear-to-r
          from-primary/5
          via-transparent
          to-accent/5
        "
      />

      <div className="relative z-10 flex items-start justify-between gap-5">
        {/* LEFT */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-primary
                text-primary-foreground
                shadow-lg
                text-sm
                font-bold
              "
            >
              {index + 1}
            </div>

            <div>
              <h3 className="text-xl font-bold">{booking.customerName}</h3>
            </div>
          </div>

          {/* Info */}
          <div className="mb-4 space-y-2">
            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
              "
            >
              <FaCalendar className="text-primary" />

              <span>
                {format(new Date(booking.date), "EEEE، dd MMMM yyyy", {
                  locale: arSA,
                })}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
              "
            >
              <FaClock className="text-primary" />

              <span>{booking.timeSlot}</span>
            </div>

            {isOwner && (
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-muted-foreground
                "
              >
                <span>📱</span>

                <span>{booking.phoneNumber}</span>
              </div>
            )}
          </div>

          {/* Services */}
          {isOwner && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold">الخدمات المطلوبة</p>

              <div className="flex flex-wrap gap-2">
                {booking.services.map((service) => (
                  <span
                    key={service.id}
                    className="
                    rounded-xl
                    border
                    border-primary/20
                    bg-primary/10
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-primary
                    backdrop-blur-sm
                  "
                  >
                    {service.nameAr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.additionalNotes && isOwner && (
            <div
              className="
                rounded-2xl
                border
                border-border/50
                bg-muted/40
                p-3
              "
            >
              <p className="mb-1 text-sm font-semibold">ملاحظات العميل</p>

              <p className="text-sm text-muted-foreground">
                {booking.additionalNotes}
              </p>
            </div>
          )}

          {/* Phone Verification */}
          {showPhoneInput && !isOwner && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mt-4
                rounded-2xl
                border
                border-primary/20
                bg-primary/5
                p-4
              "
            >
              <div className="mb-3 flex items-center gap-2">
                <FaLock className="text-primary" />

                <p className="text-sm font-semibold">
                  أدخل رقم الهاتف لعرض الفاتورة
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  placeholder="أدخل رقم الهاتف"
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-border
                    bg-background/80
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                  "
                />

                <button
                  onClick={handleVerifyPhone}
                  className="
                    rounded-xl
                    bg-primary
                    px-5
                    py-3
                    font-medium
                    text-primary-foreground
                    transition-all
                    hover:scale-[1.02]
                    hover:opacity-90
                  "
                >
                  تاكيد
                </button>
                <button
                  onClick={setShowPhoneInput.bind(null, false)}
                  className="
                    rounded-xl
                    bg-red-500
                    px-5
                    py-3
                    font-medium
                    text-white
                    transition-all
                    hover:scale-[1.02]
                    hover:opacity-90
                  "
                >
                  الغاء
                </button>
              </div>

              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </motion.div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-3">
          {isOwner && (
            <div className="text-left">
              <p className="text-3xl font-extrabold text-primary">
                {booking.totalCost}
              </p>

              <span className="text-sm text-muted-foreground">جنيه</span>
            </div>
          )}

          <div className="flex gap-2">
            {/* Invoice */}
            <button
              onClick={handleOpenInvoice}
              className="
                flex
                items-center
                justify-center
                rounded-2xl
                bg-primary
                p-3
                text-primary-foreground
                shadow-lg
                transition-all
                duration-300
                hover:scale-110
                hover:shadow-primary/30
              "
              title="عرض الفاتورة"
            >
              <FaReceipt className="h-4 w-4" />
            </button>

            {/* Delete */}
            {isOwner && (
              <button
                onClick={() => deleteBooking?.(booking.id)}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-destructive
                  p-3
                  text-destructive-foreground
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-110
                "
                title="حذف الحجز"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
