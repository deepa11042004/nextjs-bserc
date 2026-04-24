import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIST(dateValue: string | Date | null | undefined): string {
  if (!dateValue) return "-";
  
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return String(dateValue);

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
