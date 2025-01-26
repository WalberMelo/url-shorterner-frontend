import toast from 'react-hot-toast';

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Error:", error.message);
    toast.error(error.message || "Something went wrong!");
  } else {
    console.error("Unknown error:", error);
    toast.error("An unexpected error occurred. Please try again.");
  }
};

export const handleSuccess = (message: string) => {
  toast.success(message);
};

export const handleCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast("Short URL copied to clipboard!", {
        icon: "📎",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    })
    .catch((error) => {
      handleError(error);
    });
};

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
