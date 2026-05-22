"use client";
import { motion } from "motion/react";
import { FaLock, FaUnlock } from "react-icons/fa6";
import { LuScissors } from "react-icons/lu";
import { ThemeToggle } from "../theme-toggle/ThemeToggle";
import { useBarber } from "@/app/_context/BarberContextProvider";

export default function Navbar() {
  const { shopStatus, isOwner, setIsOwner } = useBarber();
  const OWNER_PASSWORD = "Saif0987654321";

  const handleOwnerAccess = async () => {
    try {
      if (isOwner) {
        await setIsOwner(false);
        return;
      }

      const password = window.prompt("أدخل كلمة المرور:");
      if (password === OWNER_PASSWORD) {
        await setIsOwner(true);
      } else {
        window.alert("كلمة المرور غير صحيحة.");
      }
    } catch (error) {
      console.error(error);
      window.alert("تعذر تحديث حالة المالك. حاول مرة أخرى.");
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <LuScissors className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                سيف <span className="text-primary">VIP</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${shopStatus.isOpen ? "bg-green-400" : "bg-red-400"} opacity-75`}
                  ></span>

                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      shopStatus.isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </span>
                <p className="text-sm text-muted-foreground">
                  {shopStatus.isOpen ? "مفتوح الآن" : "مغلق"}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOwnerAccess}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                isOwner
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isOwner ? (
                <FaUnlock className="w-4 h-4" />
              ) : (
                <FaLock className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isOwner ? "تسجيل خروج المالك" : "تسجيل دخول المالك"}
              </span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
