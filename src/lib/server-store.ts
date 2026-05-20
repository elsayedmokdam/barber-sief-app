import { promises as fs } from "fs";
import { dirname, join } from "path";
import { Booking, Service, ShopStatus } from "@/types";

const STORE_PATH = join(process.cwd(), "data", "barber-store.json");
const DEFAULT_SERVICES: Service[] = [
  { id: "1", nameAr: "حلاقة شعر", price: 50, durationMinutes: 30 },
  { id: "2", nameAr: "حلاقة ذقن", price: 30, durationMinutes: 15 },
  { id: "3", nameAr: "حلاقة شعر وذقن", price: 70, durationMinutes: 45 },
  { id: "4", nameAr: "صبغة شعر", price: 100, durationMinutes: 60 },
  { id: "5", nameAr: "تشذيب شعر", price: 40, durationMinutes: 20 },
];

const DEFAULT_SHOP_STATUS: ShopStatus = {
  isOpen: true,
  lastUpdated: Date.now(),
};

interface StoreData {
  services: Service[];
  bookings: Booking[];
  shopStatus: ShopStatus;
  isOwner: boolean;
}

async function ensureStoreFile() {
  await fs.mkdir(dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    const initialStore: StoreData = {
      services: DEFAULT_SERVICES,
      bookings: [],
      shopStatus: DEFAULT_SHOP_STATUS,
      isOwner: false,
    };
    await fs.writeFile(STORE_PATH, JSON.stringify(initialStore, null, 2), "utf8");
  }
}

async function readStore(): Promise<StoreData> {
  await ensureStoreFile();
  const content = await fs.readFile(STORE_PATH, "utf8");
  return JSON.parse(content) as StoreData;
}

async function writeStore(store: StoreData) {
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
  return store;
}

export async function getServices(): Promise<Service[]> {
  const store = await readStore();
  return store.services;
}

export async function addService(
  service: Omit<Service, "id">,
): Promise<Service> {
  const store = await readStore();
  const newService: Service = {
    ...service,
    id: Date.now().toString(),
  };
  store.services.push(newService);
  await writeStore(store);
  return newService;
}

export async function updateService(
  id: string,
  updatedService: Partial<Service>,
): Promise<Service | null> {
  const store = await readStore();
  const index = store.services.findIndex((service) => service.id === id);
  if (index === -1) {
    return null;
  }
  store.services[index] = {
    ...store.services[index],
    ...updatedService,
  };
  await writeStore(store);
  return store.services[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const store = await readStore();
  const originalLength = store.services.length;
  store.services = store.services.filter((service) => service.id !== id);
  await writeStore(store);
  return store.services.length < originalLength;
}

export async function getBookings(): Promise<Booking[]> {
  const store = await readStore();
  return store.bookings;
}

export async function addBooking(
  booking: Omit<Booking, "id" | "createdAt">,
): Promise<Booking> {
  const store = await readStore();
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: Date.now(),
  };
  store.bookings.push(newBooking);
  await writeStore(store);
  return newBooking;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const store = await readStore();
  const originalLength = store.bookings.length;
  store.bookings = store.bookings.filter((booking) => booking.id !== id);
  await writeStore(store);
  return store.bookings.length < originalLength;
}

export async function getShopStatus(): Promise<ShopStatus> {
  const store = await readStore();
  return store.shopStatus;
}

export async function setShopStatus(shopStatus: ShopStatus): Promise<ShopStatus> {
  const store = await readStore();
  store.shopStatus = shopStatus;
  await writeStore(store);
  return shopStatus;
}

export async function getIsOwner(): Promise<boolean> {
  const store = await readStore();
  return store.isOwner;
}

export async function setIsOwner(isOwner: boolean): Promise<boolean> {
  const store = await readStore();
  store.isOwner = isOwner;
  await writeStore(store);
  return isOwner;
}
