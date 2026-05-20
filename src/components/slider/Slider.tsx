"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { A11y, Autoplay, Pagination, Navigation } from "swiper/modules";
import { ReactNode } from "react";

interface SliderProps {
  children?: ReactNode[];
  imageList?: string[];
  bulletImages?: string[];
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  autoplay?: boolean | { delay: number; disableOnInteraction?: boolean };
  loop?: boolean;
  navigation?: boolean;
  pagination?:
    | {
        clickable?: boolean;
        type?: "bullets" | "fraction" | "progressbar";
        bulletActiveClass?: string;
        renderBullet?: (index: number, className: string) => string;
      }
    | boolean;
  breakpoints?: Record<
    number,
    { slidesPerView: number; spaceBetween?: number }
  >;
  className?: string;
  slideClassName?: string;
  imageClassName?: string;
  onSlideChange?: (swiper: any) => void;
  onSwiper?: (swiper: any) => void;
  renderBullet?: (index: number, className: string) => string;
}

export default function Slider({
  children,
  imageList = [],
  bulletImages = [],
  spaceBetween = 30,
  slidesPerView = 1,
  autoplay = { delay: 3000, disableOnInteraction: false },
  loop = true,
  navigation = true,
  pagination = { clickable: true },
  breakpoints,
  className = "z-20",
  slideClassName = "",
  imageClassName = "w-full h-120 object-cover",
  onSlideChange,
  onSwiper,
  renderBullet,
}: SliderProps) {
  const slides =
    children ||
    imageList.map((image, index) => (
      <img
        key={image}
        src={image}
        className={imageClassName}
        alt={`Slide ${index + 1}`}
      />
    ));

  // Handle renderBullet with image URLs
  const paginationConfig =
    typeof pagination === "object" &&
    pagination.renderBullet === undefined &&
    bulletImages.length > 0
      ? {
          ...pagination,
          renderBullet,
        }
      : pagination;

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay, Navigation]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      autoplay={autoplay}
      loop={loop}
      navigation={navigation}
      pagination={{
        ...(paginationConfig as object),
        el: ".custom-pagination",
        clickable: true,
      }}
      breakpoints={breakpoints}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
      className={className}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={slideClassName}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
