"use client";

import toast, { ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "custom";

function showToast(type: ToastType, message: string, config?: ToastOptions) {
  switch (type) {
    case "success":
      return toast.success(message, config);
    case "error":
      return toast.error(message, config);
    case "loading":
      return toast.loading(message, config);
    default:
      return toast(message, config);
  }
}

export const notify = {
  success: (message: string) => showToast("success", message),

  error: (message: string) => showToast("error", message),

  info: (message: string) => showToast("custom", message),

  loading: (message: string) => showToast("loading", message),
};

/**
 * Utility to handle promise-based notifications
 * @params promise - The promise to track
 * @params messages - Custom messages for loading, success, and error states
 * @returns The original promise result
 */
export function notifyPromise<T>(
  promise: Promise<T>,
  messages: {
    loading?: string;
    success: string;
    error: string;
  } = {
    loading: "Loading...",
    success: "Operation successful!",
    error: "Operation failed!",
  },
) {
  const toastId = notify.loading(messages.loading || "Loading...");
  return promise
    .then((data) => {
      toast.dismiss(toastId);
      notify.success(messages.success);
      return data;
    })
    .catch((error) => {
      toast.dismiss(toastId);
      notify.error(messages.error);
      throw error;
    });
}
