"use client";
import { motion } from "framer-motion";
export default function ImportantInfo() {
  return (
    <div>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl p-6 border border-primary/20"
        >
          <h3 className="font-bold mb-4">معلومات مهمة</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>مدة الحلاقة من 30 دقيقة إلى 90 دقيقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>الدفع عند الحلاقة فقط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>يمكنك طباعة فاتورتك بعد الحجز</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>احجز مسبقاً لتوفير الوقت</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-6 border border-border"
        >
          <h3 className="font-bold mb-4">أوقات العمل</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">السبت - الخميس</span>
              <span className="font-medium">12:00 م - 2:00 ص</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الجمعة</span>
              <span className="font-medium">2:00 م - 2:00 ص</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              راجع الحالة الحالية أعلى الصفحة
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 border border-border text-center"
        >
          <div className="text-4xl mb-3">💈</div>
          <h3 className="font-bold mb-2">خدمة احترافية</h3>
          <p className="text-sm text-muted-foreground">
            أفضل حلاقين في المنطقة بخدمة عالية الجودة
          </p>
        </motion.div>
      </div>
    </div>
  );
}
