import { motion, AnimatePresence } from "motion/react";
import { format, parse } from "date-fns";
import { arSA } from "date-fns/locale/ar-SA";
import { Booking } from "@/types";
import InvoiceButtons from "../invoice-buttons/InvoiceButtons";

interface InvoiceProps {
  booking: Booking;
  onClose: () => void;
}

export function Invoice({ booking, onClose }: InvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
        >
          <div className="p-6 print:p-8">
            <div className="flex items-center justify-between mb-6 print:hidden">
              <h2>فاتورة الحجز</h2>
              <InvoiceButtons onClose={onClose} handlePrint={handlePrint} />
            </div>

            <div className="border-2 border-primary rounded-xl p-6 print:border-black">
              <div className="text-center mb-6 pb-6 border-b border-border">
                <h1 className="text-3xl font-bold text-primary mb-2">
                  💈 صالون الحلاقة
                </h1>
                <p className="text-muted-foreground">فاتورة حجز</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    اسم العميل
                  </p>
                  <p className="font-bold text-lg">{booking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    رقم الهاتف
                  </p>
                  <p className="font-bold text-lg">{booking.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">التاريخ</p>
                  <p className="font-bold">
                    {format(parse(booking.date, "yyyy-MM-dd", new Date()), "EEEE، dd MMMM yyyy", {
                      locale: arSA,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">الوقت</p>
                  <p className="font-bold">{booking.timeSlot}</p>
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-bold mb-4">الخدمات المطلوبة</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-right py-2">الخدمة</th>
                      <th className="text-center py-2">المدة</th>
                      <th className="text-left py-2">السعر</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.services.map((service) => (
                      <tr
                        key={service.id}
                        className="border-b border-border/50"
                      >
                        <td className="py-3 text-right">{service.nameAr}</td>
                        <td className="py-3 text-center text-muted-foreground">
                          {service.durationMinutes} دقيقة
                        </td>
                        <td className="py-3 text-left font-medium">
                          {service.price} جنيه
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {booking.additionalNotes && (
                <div className="mb-6 pb-6 border-b border-border">
                  <h3 className="font-bold mb-2">ملاحظات</h3>
                  <p className="text-muted-foreground">
                    {booking.additionalNotes}
                  </p>
                </div>
              )}

              <div className="bg-primary/10 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">عدد الخدمات:</span>
                  <span className="font-bold">{booking.services.length}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">
                    المدة الإجمالية:
                  </span>
                  <span className="font-bold">
                    {booking.services.reduce(
                      (sum, s) => sum + s.durationMinutes,
                      0,
                    )}{" "}
                    دقيقة
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t-2 border-primary/30">
                  <span className="font-bold text-lg">المبلغ الإجمالي:</span>
                  <span className="font-bold text-2xl text-primary">
                    {booking.totalCost} جنيه
                  </span>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p className="mb-1">الدفع عند الحلاقة</p>
                <p>شكراً لاختياركم صالوننا</p>
                <p className="mt-4 text-xs">
                  رقم الحجز: {booking.id} | تاريخ الإصدار:{" "}
                  {format(new Date(booking.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
