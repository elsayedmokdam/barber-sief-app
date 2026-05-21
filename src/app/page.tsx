"use client";

import HomeSlider from "@/components/home-slider/HomeSlider";
import MainPage from "@/components/main-page/MainPage";
import { useBarber } from "./_context/BarberContextProvider";

export default function page() {
  const { isOwner } = useBarber();
  return (
    <>
      {!isOwner && <HomeSlider />}
      <MainPage isOwner={isOwner} />
    </>
  );
}
