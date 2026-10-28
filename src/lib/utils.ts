import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function round(n: number) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

export function kes(n: number) {
  const v = Number(n) || 0;
  const neg = v < 0;
  const abs = Math.abs(v);
  const digits = Math.abs(abs - Math.round(abs)) < 0.001 ? 0 : 2;
  const body = abs.toLocaleString("en-KE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return `${neg ? "-" : ""}KES ${body}`;
}

export function uid() {
  return crypto.randomUUID();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function monthNumber(name: string | number) {
  if (typeof name === "number") return name;
  const n = Number(name);
  if (Number.isFinite(n) && n >= 1 && n <= 12) return n;
  const idx = MONTHS.findIndex((m) => m.toLowerCase() === String(name).slice(0, 3).toLowerCase());
  return idx >= 0 ? idx + 1 : 0;
}

export function monthName(m: number) {
  return MONTHS[m - 1] || String(m);
}

export function prettyConfig(config: string) {
  return config
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function inMonth(date: string, month: number, year: number) {
  const [y, m] = date.slice(0, 10).split("-").map(Number);
  return y === year && m === month;
}

export const AS_OF = new Date("2026-10-28T12:00:00+03:00");

export function daysPastDue(due: string) {
  const d = new Date(`${due.slice(0, 10)}T00:00:00+03:00`);
  return Math.floor((AS_OF.getTime() - d.getTime()) / 86_400_000);
}

export function nextCode(existing: string[], prefix: string, width = 3) {
  let max = 0;
  const re = new RegExp(`${prefix}(\\d+)$`, "i");
  for (const code of existing) {
    const m = re.exec(code);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `${prefix}${String(max + 1).padStart(width, "0")}`;
}

export const BRANCHES = ["Nairobi Head Office", "Westlands", "Thika", "Mombasa Coastal"] as const;
