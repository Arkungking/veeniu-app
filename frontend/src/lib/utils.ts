import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { monthData } from "./const-data";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateInput: string | Date,
  type: "time" | "date" | "full" = "full",
): string {
  const date = new Date(dateInput);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = `${hours}.${minutes} WIB`;

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthData[date.getMonth()];
  const year = date.getFullYear();
  const dateOnly = `${day} ${month} ${year}`;

  switch (type) {
    case "time":
      return time;
    case "date":
      return dateOnly;
    default:
      return `${dateOnly} | ${time}`;
  }
}

export function formatCurrency(
  value: number,
  withSymbol: boolean = true,
): string {
  const formatted = value.toLocaleString("id-ID");
  return withSymbol ? `Rp\u00A0${formatted}` : formatted;
}

export const isEventPassed = (dateString: string): boolean => {
  const targetDate = new Date(dateString);
  const now = new Date();
  return targetDate.getTime() < now.getTime();
};

export function randomCodeGenerator(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
}

export function getGreeting(username: string, hour?: number): string {
  const currentHour = hour ?? new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return `Good morning, ${username}`;
  if (currentHour >= 12 && currentHour < 18) return `Good evening, ${username}`;
  return `Good night, ${username}`;
}

export function splitName(name: string): [string, string] {
  const parts = name.trim().split(/\s+/);

  const firstName = parts[0] || "";
  const lastName = parts[1] || "";

  return [firstName, lastName];
}
