"use client";
import { Booking, Service, ShopStatus } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface BarberContextType {
  services: Service[];
  bookings: Booking[];
  shopStatus: ShopStatus;
  isOwner: boolean;
  setIsOwner: (isOwner: boolean) => Promise<void>;
  addService: (service: Omit<Service, "id">) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  updateShopStatus: (isOpen: boolean) => Promise<void>;
  getAvailableTimeSlots: (date: string) => string[];
}

export const BarberContext = createContext({} as BarberContextType);
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function BarberContextProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [shopStatus, setShopStatusState] = useState<ShopStatus>(
    { isOpen: true, lastUpdated: Date.now() },
  );

  const [isOwner, setIsOwnerState] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesResponse, bookingsResponse, shopResponse] = await Promise.all([
          fetch(`${baseUrl}/api/services`),
          fetch(`${baseUrl}/api/bookings`),
          fetch(`${baseUrl}/api/shop-status`),
        ]);

        if (!servicesResponse.ok) {
          console.error("Failed to load services");
          setServices([]);
        } else {
          setServices(await servicesResponse.json());
        }

        if (!bookingsResponse.ok) {
          console.error("Failed to load bookings");
          setBookings([]);
        } else {
          setBookings(await bookingsResponse.json());
        }

        if (!shopResponse.ok) {
          console.error("Failed to load shop status");
        } else {
          setShopStatusState(await shopResponse.json());
        }
      } catch (error) {
        console.error("Failed to fetch barber data:", error);
        setServices([]);
        setBookings([]);
      }
    }

    loadData();

    const storedOwner = window.localStorage.getItem("isOwner");
    setIsOwnerState(storedOwner === "true");
  }, []);

  const addService = async (service: Omit<Service, "id">) => {
    const response = await fetch(`${baseUrl}/api/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error("Failed to add service");
    }

    const newService: Service = await response.json();
    setServices((prev) => [...prev, newService]);
  };

  const updateService = async (
    id: string,
    updatedService: Partial<Service>,
  ) => {
    const response = await fetch(`${baseUrl}/api/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedService),
    });

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    const service = await response.json();
    setServices((prev) => prev.map((s) => (s.id === id ? service : s)));
  };

  const deleteService = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/services/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }

    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addBooking = async (booking: Omit<Booking, "id" | "createdAt">) => {
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      throw new Error("Failed to add booking");
    }

    const newBooking: Booking = await response.json();
    setBookings((prev) => [...prev, newBooking]);
  };

  const deleteBooking = async (id: string) => {
    const response = await fetch(`${baseUrl}/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }

    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const updateShopStatus = async (isOpen: boolean) => {
    const response = await fetch(`${baseUrl}/api/shop-status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOpen }),
    });

    if (!response.ok) {
      throw new Error("Failed to update shop status");
    }

    const updatedStatus: ShopStatus = await response.json();
    setShopStatusState(updatedStatus);
  };

  const setIsOwner = async (owner: boolean) => {
    window.localStorage.setItem("isOwner", owner ? "true" : "false");
    setIsOwnerState(owner);
  };

  const getAvailableTimeSlots = (date: string): string[] => {
    const allTimeSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
    ];

    const bookedSlots = bookings
      .filter((b) => b.date === date)
      .map((b) => b.timeSlot);

    return allTimeSlots.filter((slot) => !bookedSlots.includes(slot));
  };

  return (
    <BarberContext.Provider
      value={{
        services,
        bookings,
        shopStatus,
        isOwner,
        setIsOwner,
        addService,
        updateService,
        deleteService,
        addBooking,
        deleteBooking,
        updateShopStatus,
        getAvailableTimeSlots,
      }}
    >
      {children}
    </BarberContext.Provider>
  );
}

export function useBarber() {
  const context = useContext(BarberContext);
  if (!context) {
    throw new Error("useBarber must be used within a BarberProvider");
  }
  return context;
}
