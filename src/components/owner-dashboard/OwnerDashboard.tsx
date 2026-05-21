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

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="
                group
                rounded-3xl
                border
                border-border/50
                bg-card/70
                backdrop-blur-xl
                p-5
                shadow-lg
                transition-all
                duration-300
                hover:border-primary/20
                hover:shadow-2xl
                "
            >
              {editingServiceId === service.id ? (
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Inputs */}
                  <div className="grid flex-1 grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Service Name */}
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">
                        اسم الخدمة
                      </label>

                      <input
                        type="text"
                        placeholder="مثال: حلاقة شعر"
                        value={editedService.nameAr || ""}
                        onChange={(e) =>
                          setEditedService({
                            ...editedService,
                            nameAr: e.target.value,
                          })
                        }
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-border
                          bg-background/80
                          px-4
                          py-3
                          outline-none
                          transition-all
                          duration-300
                          focus:border-primary
                          focus:ring-2
                          focus:ring-primary/20
                          hover:border-primary/40
                          "
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">
                        السعر
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          placeholder="150"
                          value={editedService.price || ""}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              price: Number(e.target.value),
                            })
                          }
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background/80
                            px-4
                            py-3
                            pl-16
                            outline-none
                            transition-all
                            duration-300
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/20
                            hover:border-primary/40
                            "
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          جنيه
                        </span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-1">
                      <label className="text-sm text-muted-foreground">
                        المدة
                      </label>

                      <div className="relative">
                        <input
                          type="number"
                          placeholder="30"
                          value={editedService.durationMinutes || ""}
                          onChange={(e) =>
                            setEditedService({
                              ...editedService,
                              durationMinutes: Number(e.target.value),
                            })
                          }
                          className="
                            w-full
                            rounded-2xl
                            border
                            border-border
                            bg-background/80
                            px-4
                            py-3
                            pl-20
                            outline-none
                            transition-all
                            duration-300
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/20
                            hover:border-primary/40
                            "
                        />

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          دقيقة
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-end gap-3">
                    {/* Save */}
                    <button
                      onClick={() => handleUpdateService(service.id)}
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-green-500
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:bg-green-600
                        active:scale-95
                        "
                      title="حفظ"
                    >
                      <FaCheck className="w-4 h-4" />
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() => setEditingServiceId(null)}
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-red-500
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:bg-red-600
                        active:scale-95
                        "
                      title="إلغاء"
                    >
                      <FaX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Service Info */}
                  <div className="flex flex-1 items-center gap-4">
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
                      ✂️
                    </div>

                    {/* Details */}
                    <div>
                      <h3 className="text-lg font-bold">{service.nameAr}</h3>

                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="rounded-full bg-muted px-3 py-1">
                          ⏱ {service.durationMinutes} دقيقة
                        </span>

                        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary font-medium">
                          💰 {service.price} جنيه
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {/* Edit */}
                    <button
                      onClick={() => startEditing(service)}
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-border
                        bg-background/60
                        transition-all
                        duration-300
                        hover:border-primary/30
                        hover:bg-primary/10
                        hover:text-primary
                        hover:scale-105
                        "
                      title="تعديل"
                    >
                      <RiEdit2Fill className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => void handleDeleteService(service.id)}
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-red-500/10
                        text-red-500
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:bg-red-500
                        hover:text-white
                        "
                      title="حذف"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
