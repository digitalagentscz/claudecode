import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number as currency
 */
export function formatCurrency(
  amount: number,
  currency: string = "CZK"
): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to Czech locale
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("cs-CZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return "právě teď";
  if (diffInSeconds < 3600) return `před ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `před ${Math.floor(diffInSeconds / 3600)} h`;
  if (diffInSeconds < 604800) return `před ${Math.floor(diffInSeconds / 86400)} dny`;

  return formatDate(d);
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Slugify string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Parse JSON safely
 */
export function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Get social platform color
 */
export function getSocialColor(platform: string): string {
  const colors: Record<string, string> = {
    instagram: "#E4405F",
    facebook: "#1877F2",
    linkedin: "#0A66C2",
    x: "#000000",
    tiktok: "#000000",
    youtube: "#FF0000",
    google_business: "#4285F4",
  };
  return colors[platform] || "#6366F1";
}

/**
 * Get social platform icon class
 */
export function getSocialIconClass(platform: string): string {
  const classes: Record<string, string> = {
    instagram: "social-instagram",
    facebook: "social-facebook",
    linkedin: "social-linkedin",
    x: "social-x",
    tiktok: "social-tiktok",
    youtube: "social-youtube",
    google_business: "social-google",
  };
  return classes[platform] || "badge-primary";
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
