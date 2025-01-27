import { create } from "zustand";

import { HistoryState } from "./types";

export const useUrlStore = create<HistoryState>((set) => ({
  history: [
    {
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      originalUrl: "",
      shortUrl: "",
      description: "",
    },
  ],

  setHistory: (newHistory) =>
    set(() => ({
      history: newHistory,
    })),
}));
