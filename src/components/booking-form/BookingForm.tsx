"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { Service } from "@/types";
import { format } from "date-fns";
import { notify } from "@/lib/helpers/alerts";
import { FaCalendar, FaClock, FaPhone, FaUser } from "react-icons/fa6";

// Converts an Arabic time slot to minutes on a continuous scale starting at noon.
// Post-midnight ص slots get +1440 so they sort after all م (PM) slots,
// matching the scale used in BarberContextProvider.
const slotToMinutes = (slot: string): number => {
  const [time, period] = slot.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "م" && hours !== 12) hours += 12;
  if (period === "ص" && hours === 12) hours = 0;

  let total = hours * 60 + minutes;
  // AM slots belong at the end of the shift (after midnight)
  if (period === "ص") total += 1440;
  return total;
};

export function BookingForm() {
  const { services, bookings, addBooking, getAvailableTimeSlots, shopStatus } =
    useBarber();

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // ليلة العيد

  const specialDate = "2026-05-26";

  const specialSlots = [
    "02:00 ص",
    "02:20 ص",
    "02:40 ص",
    "03:00 ص",
    "03:20 ص",
    "03:40 ص",
    "04:00 ص",
    "04:20 ص",
    "04:40 ص",
    "05:00 ص",
    "05:20 ص",
    "05:40 ص",
    "06:00 ص",
  ];

  const isSpecialDate = useMemo(
    () => selectedDate === specialDate,
    [selectedDate],
  );

  const isSpecialTime = useMemo(
    () => specialSlots.includes(selectedTime),
    [selectedTime],
  );

  const availableSlots = useMemo(() => {
    // Normal slots already have booked + past times removed by getAvailableTimeSlots
    const normalSlots = getAvailableTimeSlots(selectedDate);

    if (!isSpecialDate) {
      return normalSlots;
    }

    // For the special date, filter special slots the same way:
    // remove already-booked ones and remove past ones if today
    const bookedOnDate = bookings
      .filter((b) => b.date === selectedDate)
      .map((b) => b.timeSlot);

    const todayStr = new Date().toISOString().split("T")[0];
    const isToday = selectedDate === todayStr;

    let nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    if (new Date().getHours() < 12) nowMinutes += 1440;

    const filteredSpecialSlots = specialSlots.filter((slot) => {
      if (bookedOnDate.includes(slot)) return false;
      if (isToday && slotToMinutes(slot) <= nowMinutes) return false;
      return true;
    });

    // Merge, deduplicate, and sort chronologically
    return [...new Set([...normalSlots, ...filteredSpecialSlots])].sort(
      (a, b) => slotToMinutes(a) - slotToMinutes(b),
    );
  }, [selectedDate, bookings, isSpecialDate, getAvailableTimeSlots]);

  const filteredServices = useMemo(
    () =>
      isSpecialDate && isSpecialTime
        ? services.filter((service) => service.nameAr === "استشوار")
        : services,
    [isSpecialDate, isSpecialTime, services],
  );

  useEffect(() => {
    if (isSpecialDate && isSpecialTime) {
      setSelectedServices((prev) =>
        prev.filter((service) => service.nameAr === "استشوار"),
      );
    }
  }, [isSpecialDate, isSpecialTime]);

  useEffect(() => {
    if (selectedTime && !availableSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [selectedDate, availableSlots, selectedTime]);

  const totalCost = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0,
  );

  const totalDuration = selectedServices.reduce(
    (sum, service) => sum + service.durationMinutes,
    0,
  );

  const handleServiceToggle = (service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) return prev.filter((s) => s.id !== service.id);
      return [...prev, service];
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!shopStatus.isOpen) {
      notify.error("عذراً، المحل مغلق حالياً");
      return;
    }

    if (
      !customerName ||
      !phoneNumber ||
      !selectedTime ||
      selectedServices.length === 0
    ) {
      notify.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    try {
      await addBooking({
        customerName,
        phoneNumber,
        date: selectedDate,
        timeSlot: selectedTime,
        services: selectedServices,
        additionalNotes,
        totalCost,
      });

      setIsLoading(false);

      notify.success("تم الحجز بنجاح ✅");

      // Reset
      setCustomerName("");
      setPhoneNumber("");
      setSelectedTime("");
      setSelectedServices([]);
      setAdditionalNotes("");
    } catch (error) {
      console.error(error);
      notify.error("فشل إنشاء الحجز");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
        shadow-lg
      "
    >
      <div className="mb-6">
        <h2 className="mb-2">احجز موعدك</h2>

        {!shopStatus.isOpen && (
          <div
            className="
              rounded-lg
              border
              border-red-500/20
              bg-red-500/10
              p-3
            "
          >
            <p className="text-center font-medium text-red-500">
              ⚠️ المحل مغلق حالياً
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2">
              <FaUser className="h-4 w-4 text-primary" />
              الاسم
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="أدخل اسمك"
              required
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-input-background
                px-4
                py-3
                text-gray-900
                transition-all
                focus:ring-2
                focus:ring-primary
                focus:outline-none
              "
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2">
              <FaPhone className="h-4 w-4 text-primary" />
              رقم الهاتف
            </label>

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="^01[0125][0-9]{8}$"
              title="يرجى إدخال رقم صحيح"
              placeholder="01xxxxxxxxx"
              required
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-input-background
                px-4
                py-3
                text-gray-900
                transition-all
                focus:ring-2
                focus:ring-primary
                focus:outline-none
              "
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 flex items-center gap-2">
            <FaCalendar className="h-4 w-4 text-primary" />
            التاريخ
          </label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={format(new Date(), "yyyy-MM-dd")}
            required
            className="
              w-full
              rounded-xl
              border
              border-border
              bg-input-background
              px-4
              py-3
              text-gray-900
              transition-all
              focus:ring-2
              focus:ring-primary
              focus:outline-none
            "
          />
        </div>

        {/* The Available Slots */}
        <div>
          <label className="mb-2 flex items-center gap-2">
            <FaClock className="h-4 w-4 text-primary" />
            الوقت المتاح
          </label>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`
                    rounded-lg
                    border
                    px-3
                    py-2
                    text-center
                    transition-all
                    duration-300
                    hover:scale-105

                    ${
                      selectedTime === slot
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-input-background text-gray-900 hover:border-primary"
                    }
                  `}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p className="col-span-full py-4 text-center text-muted-foreground">
                لا توجد مواعيد متاحة في هذا اليوم يمكنك الحجز في يوم اخر
              </p>
            )}
          </div>
        </div>

        {/* Services */}
        <div>
          <label className="mb-2 block">اختر الخدمات</label>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceToggle(service)}
                className={`
                  rounded-xl
                  border
                  p-4
                  text-right
                  transition-all
                  duration-300

                  ${
                    selectedServices.find((s) => s.id === service.id)
                      ? "scale-105 border-primary bg-primary text-white"
                      : "border-border bg-input-background text-gray-900 hover:scale-[1.02] hover:border-primary"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.nameAr}</p>
                    <p className="text-sm opacity-80">
                      {service.durationMinutes} دقيقة
                    </p>
                  </div>
                  <p className="font-bold">{service.price} جنيه</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2 block">ملاحظات إضافية</label>

          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={3}
            placeholder="أي ملاحظات أو طلبات خاصة..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-border
              bg-input-background
              px-4
              py-3
              text-gray-900
              transition-all
              focus:ring-2
              focus:ring-primary
              focus:outline-none
            "
          />
        </div>

        {/* Summary */}
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="
              rounded-xl
              border
              border-primary/20
              bg-accent/50
              p-4
            "
          >
            <h3 className="mb-2">ملخص الحجز</h3>

            <div className="space-y-1 text-sm">
              <p>عدد الخدمات: {selectedServices.length}</p>
              <p>المدة الإجمالية: {totalDuration} دقيقة</p>
              <p className="text-lg font-bold text-primary">
                المبلغ الإجمالي: {totalCost} جنيه
              </p>
            </div>
          </motion.div>
        )}

        {/* Submit button */}
        <button
          disabled={selectedServices.length === 0 || isLoading}
          type="submit"
          className="
            w-full
            rounded-xl
            bg-primary
            py-4
            text-lg
            font-bold
            text-primary-foreground
            transition-all
            duration-300
            hover:scale-105
            hover:bg-primary/90
          "
        >
          تأكيد الحجز
        </button>
      </form>
    </motion.div>
  );
}
