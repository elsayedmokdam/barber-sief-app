"use client";
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize Theme
  React.useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (prefersDark) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-all duration-300 hover:scale-105"
      aria-label="تبديل الوضع"
    >
      {darkMode ? (
        <IoSunny className="w-5 h-5 text-primary" />
      ) : (
        <FaMoon className="w-5 h-5 text-primary" />
      )}
    </button>
  );
}
