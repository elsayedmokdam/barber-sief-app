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
      "01:00 م",
      "01:30 م",
      "02:00 م",
      "02:30 م",
      "03:00 م",
      "03:30 م",
      "04:00 م",
      "04:30 م",
      "05:00 م",
      "05:30 م",
      "07:00 م",
      "07:30 م",
      "08:00 م",
      "08:30 م",
      "09:00 م",
      "09:30 م",
      "10:00 م",
      "10:30 م",
      "11:00 م",
      "11:30 م",
      "12:00 ص",
      "12:30 ص",
      "01:00 ص",
      "01:30 ص",
      "02:00 ص",
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
