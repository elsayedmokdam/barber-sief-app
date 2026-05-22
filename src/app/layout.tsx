import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import React from "react";
import image from "@/assets/images/seif.jpeg";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { BarberContextProvider } from "./_context/BarberContextProvider";

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seif-hazem.vercel.app/"),

  title: {
    default: "Sief Hazem",
    template: "%s | Sief Hazem",
  },

  keywords: [
    "Sief Hazem",
    "سيف حازم",
    "حلاقة رجالية",
    "حلاق",
    "صالون حلاقة",
    "تسريحات شعر رجالية",
    "قصات شعر رجالية",
    "حلاقة لحي",
    "تصفيف شعر رجالي",
    "حلاقة أطفال",
    "حلاقة ذقن",
    "تسريحات شعر حديثة",
    "حلاقة كلاسيكية",
    "صالون حلاقة في مصر",
  ],

  authors: [
    {
      name: "Sief Hazem",
    },
  ],

  creator: "Elsayed Mokdam",

  publisher: "Elsayed Mokdam",

  category: "حلاقة رجالية",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "",
  },

  openGraph: {
    title: "Sief Hazem | Barber Shop",
    description:
      "سيف حازم هو صالون حلاقة محترف يقدم قصات شعر وخدمات العناية الشخصية عالية الجودة للرجال.",
    url: "",
    siteName: "صالون سيف حازم | Barber Shop",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: image.src,
        width: 1200,
        height: 630,
        alt: "صالون سيف حازم | Barber Shop",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sief Hazem | Barber Shop",
    description:
      "سيف حازم هو صالون حلاقة محترف يقدم قصات شعر وخدمات العناية الشخصية عالية الجودة للرجال.",
    images: [image.src],
  },

  icons: {
    icon: image.src,
    shortcut: image.src,
    apple: image.src,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cn(cairo.variable, "font-sans")}>
      <body>
        <BarberContextProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" />
          <Footer />
        </BarberContextProvider>
      </body>
    </html>
  );
}
