import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const downloadResume = () => {
  // Create a temporary link and trigger download
  const link = document.createElement("a");
  link.href = "/resume.pdf"; // Update with actual resume path
  link.download = "Madhan_BV_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const openExternalLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const generateGradient = (
  color: "cyan" | "purple" | "blue"
): string => {
  const gradients: Record<string, string> = {
    cyan: "from-cyan-500/20 to-transparent",
    purple: "from-purple-500/20 to-transparent",
    blue: "from-blue-500/20 to-transparent",
  };
  return gradients[color] || gradients.cyan;
};

// For responsive design utilities
export const useIsMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

export const truncate = (str: string, length: number = 100): string => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};
