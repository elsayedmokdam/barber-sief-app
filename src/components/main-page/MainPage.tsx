import { motion } from "framer-motion";
import { OwnerDashboard } from "../owner-dashboard/OwnerDashboard";
import { BookingsList } from "../booking-list/BookingList";
import ImportantInfo from "../important-info/ImportantInfo";
export default function MainPage({ isOwner }: { isOwner: boolean }) {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {isOwner ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <OwnerDashboard />
          <div className="mt-8">
            <h2 className="mb-4">جميع الحجوزات</h2>
            <BookingsList />
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div
              className={`flex-1 py-3 mb-5 text-center rounded-xl font-medium transition-all duration-300 bg-card text-card-foreground hover:shadow-lg hover:scale-102 hover:bg-accent/40! hover:text-accent-foreground!`}
            >
              <h2>حجوزات اليوم</h2>
            </div>

            <BookingsList />
          </div>

          <ImportantInfo />
        </div>
      )}
    </main>
  );
}
