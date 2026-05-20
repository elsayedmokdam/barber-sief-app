"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBarber } from "@/app/_context/BarberContextProvider";
import { Service } from "@/types";
import { FaCheck, FaPlus, FaTrash, FaX } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";

export function OwnerDashboard() {
  const {
    services,
    shopStatus,
    updateShopStatus,
    addService,
    updateService,
    deleteService,
  } = useBarber();
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newService, setNewService] = useState({
    nameAr: "",
    price: 0,
    durationMinutes: 30,
  });
  const [editedService, setEditedService] = useState<Partial<Service>>({});

  const handleAddService = async () => {
    if (newService.nameAr && newService.price > 0) {
      try {
        await addService(newService);
        setNewService({ nameAr: "", price: 0, durationMinutes: 30 });
        setIsAddingService(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateService = async (id: string) => {
    try {
      await updateService(id, editedService);
      setEditingServiceId(null);
      setEditedService({});
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (service: Service) => {
    setEditingServiceId(service.id);
    setEditedService(service);
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteService(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <h2 className="mb-4">حالة المحل</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => updateShopStatus(!shopStatus.isOpen)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
              shopStatus.isOpen
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {shopStatus.isOpen ? "المحل مفتوح ✅" : "المحل مغلق 🔒"}
          </button>
          <button
            onClick={() => updateShopStatus(!shopStatus.isOpen)}
            className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300"
          >
            {shopStatus.isOpen ? "إغلاق المحل" : "فتح المحل"}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border border-border shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2>إدارة الخدمات</h2>
          <button
            onClick={() => setIsAddingService(!isAddingService)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            <FaPlus className="w-4 h-4" />
            إضافة خدمة
          </button>
        </div>

        <AnimatePresence>
          {isAddingService && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-muted rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="اسم الخدمة"
                  value={newService.nameAr}
                  onChange={(e) =>
                    setNewService({ ...newService, nameAr: e.target.value })
                  }
                  className="px-4 py-2 bg-background border border-border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="السعر"
                  value={newService.price || ""}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      price: Number(e.target.value),
                    })
                  }
                  className="px-4 py-2 bg-background border border-border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="المدة (دقائق)"
                  value={newService.durationMinutes}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      durationMinutes: Number(e.target.value),
                    })
                  }
                  className="px-4 py-2 bg-background border border-border rounded-lg"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAddService}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaCheck className="w-4 h-4" />
                  حفظ
                </button>
                <button
                  onClick={() => setIsAddingService(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaX className="w-4 h-4" />
                  إلغاء
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-muted rounded-xl hover:bg-accent/40 transition-colors"
            >
              {editingServiceId === service.id ? (
                <>
                  <input
                    type="text"
                    value={editedService.nameAr || ""}
                    onChange={(e) =>
                      setEditedService({
                        ...editedService,
                        nameAr: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-1 bg-background border border-border rounded-lg"
                  />
                  <input
                    type="number"
                    value={editedService.price || ""}
                    onChange={(e) =>
                      setEditedService({
                        ...editedService,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-24 px-3 py-1 bg-background border border-border rounded-lg"
                  />
                  <input
                    type="number"
                    value={editedService.durationMinutes || ""}
                    onChange={(e) =>
                      setEditedService({
                        ...editedService,
                        durationMinutes: Number(e.target.value),
                      })
                    }
                    className="w-24 px-3 py-1 bg-background border border-border rounded-lg"
                  />
                  <button
                    onClick={() => handleUpdateService(service.id)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <FaCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingServiceId(null)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FaX className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="font-medium">{service.nameAr}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.durationMinutes} دقيقة
                    </p>
                  </div>
                  <p className="font-bold text-primary">{service.price} جنيه</p>
                  <button
                    onClick={() => startEditing(service)}
                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <RiEdit2Fill className="w-4 h-4 text-primary" />
                  </button>
                  <button
                    onClick={() => void handleDeleteService(service.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <FaTrash className="w-4 h-4 text-destructive" />
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
