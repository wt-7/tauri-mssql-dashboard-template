import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Functions past this point are only used in the example, and can be removed.

export const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function simpleHash(input: string, distinct_values: number): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
  }
  return Math.abs(hash) % distinct_values;
}

export const tailwindColourFromString = (s: string) => {
  const colors = [
    "bg-emerald-500 hover:hover:bg-emerald-500/80",
    "bg-indigo-500 hover:hover:bg-indigo-500/80",
    "bg-cyan-500 hover:hover:bg-cyan-500/80",
    "bg-amber-500 hover:hover:bg-amber-500/80",
    "bg-lime-500 hover:hover:bg-lime-500/80",
    "bg-orange-500 hover:hover:bg-orange-500/80",
    "bg-slate-600 hover:hover:bg-slate-600/80",
    "bg-blue-500 hover:hover:bg-blue-500/80",
    "bg-yellow-500 hover:hover:bg-yellow-500/80",
    "bg-gray-500 hover:hover:bg-gray-500/80",
  ];

  const index = simpleHash(s, colors.length);

  return colors[index];
};

export function daysElapsedSince(date: Date) {
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getDateColour(date: Date) {
  const diffDays = daysElapsedSince(date);
  if (diffDays > 365) {
    return "bg-destructive hover:hover:bg-destructive/80";
  } else if (diffDays > 180) {
    return "bg-yellow-500 hover:hover:bg-yellow-500/80";
  } else {
    return "bg-green-500 hover:hover:bg-green-500/80";
  }
}
