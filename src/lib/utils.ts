import toast from 'react-hot-toast';

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: Error) => {
  console.error("Error:", error.message);
  toast.error(error.message || "Something went wrong!");
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
