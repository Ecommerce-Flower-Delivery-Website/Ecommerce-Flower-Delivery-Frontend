import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error("Axios error:", error);
    const message =
      error.response?.data?.msg ||
      error.message ||
      "An unexpected error occurred.";
    toast.error(`Error: ${message}`);
  } else if (error instanceof Error) {
    console.error("General error:", error);
    toast.error(error.message || "An unexpected error occurred.");
  } else {
    console.error("Unexpected error:", error);
    toast.error("An unexpected error occurred.");
  }
};
