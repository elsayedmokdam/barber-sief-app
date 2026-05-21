import { motion } from "framer-motion";
import { OwnerDashboard } from "../owner-dashboard/OwnerDashboard";
import { BookingsList } from "../booking-list/BookingList";
import ImportantInfo from "../important-info/ImportantInfo";
import { FaCalendar } from "react-icons/fa6";
import BookingSearchInput from "../booking-search-input/BookingSearchInput";

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
            {/* Search for Your Bookings */}
            <div className="mb-5">
              <BookingSearchInput isOwner />
            </div>
            <div
              className={`flex-1 py-3 mb-5 text-center rounded-xl font-medium transition-all duration-300 bg-card text-card-foreground hover:shadow-lg hover:scale-102 hover:bg-accent/40! hover:text-accent-foreground! shadow-lg`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <FaCalendar />
                </span>
                <h2>جميع الحجوزات</h2>
              </div>
            </div>
            <BookingsList />
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Search for Your Bookings */}
            <div className="mb-5">
              <BookingSearchInput isOwner />
            </div>
            <div
              className={`flex-1 py-3 mb-5 text-center rounded-xl font-medium transition-all duration-300 bg-card text-card-foreground hover:shadow-lg hover:scale-102 hover:bg-accent/40! hover:text-accent-foreground! shadow-lg`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <FaCalendar />
                </span>
                <h2>جميع الحجوزات</h2>
              </div>
            </div>

            <BookingsList />
          </div>

          <ImportantInfo />
        </div>
      )}
    </main>
  );
}
