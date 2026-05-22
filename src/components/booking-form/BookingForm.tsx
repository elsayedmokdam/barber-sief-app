"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { Service } from "@/types";
import { format } from "date-fns";
import { notify } from "@/lib/helpers/alerts";
import { FaCalendar, FaClock, FaPhone, FaUser } from "react-icons/fa6";

export function BookingForm() {
  const { services, addBooking, getAvailableTimeSlots, shopStatus } =
    useBarber();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  const availableSlots = getAvailableTimeSlots(selectedDate);

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
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      notify.success("تم الحجز بنجاح! ✅");

      // Reset form
      setCustomerName("");
      setPhoneNumber("");
      setSelectedTime("");
      setSelectedServices([]);
      setAdditionalNotes("");
    } catch (error) {
      console.error(error);
      notify.error("فشل إنشاء الحجز. حاول مرة أخرى.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 border border-border shadow-lg"
    >
      <div className="mb-6">
        <h2 className="mb-2">احجز موعدك</h2>
        {!shopStatus.isOpen && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-center font-medium">
              ⚠️ المحل مغلق حالياً يمكنك الجز لغدا في الوقت المناسب لك
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <FaUser className="w-4 h-4 text-primary" />
              الاسم
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full text-gray-900 px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <FaPhone className="w-4 h-4 text-primary" />
              رقم الهاتف
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="^01[0125][0-9]{8}$"
              title="يرجى ادخال رقم هاتف صحيح"
              className="w-full text-gray-900 px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="01xxxxxxxxx"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            <FaCalendar className="w-4 h-4 text-primary" />
            التاريخ
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={format(new Date(), "yyyy-MM-dd")}
            className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-gray-900"
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2 mb-2">
            <FaClock className="w-4 h-4 text-primary" />
            الوقت المتاح
          </label>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                    selectedTime === slot
                      ? "bg-primary text-white border-primary"
                      : "bg-input-background border-border text-black hover:border-primary"
                  } text-center`}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-4">
                لا توجد مواعيد متاحة في هذا اليوم
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block">اختر الخدمات</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => handleServiceToggle(service)}
                className={`p-4 rounded-xl border transition-all duration-300 text-right ${
                  selectedServices.find((s) => s.id === service.id)
                    ? "bg-primary text-white border-primary scale-105"
                    : "bg-input-background border-border text-black hover:border-primary hover:scale-102"
                }`}
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

        <div>
          <label className="mb-2 block">ملاحظات إضافية (اختياري)</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="w-full text-gray-900 px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            rows={3}
            placeholder="أي ملاحظات أو طلبات خاصة..."
          />
        </div>

        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-4 bg-accent/50 rounded-xl border border-primary/20"
          >
            <h3 className="mb-2">ملخص الحجز</h3>
            <div className="space-y-1 text-sm">
              <p>عدد الخدمات: {selectedServices.length}</p>
              <p>المدة الإجمالية: {totalDuration} دقيقة</p>
              <p className="font-bold text-lg text-primary">
                المبلغ الإجمالي: {totalCost} جنيه
              </p>
            </div>
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          تأكيد الحجز
        </button>
      </form>
    </motion.div>
  );
}
