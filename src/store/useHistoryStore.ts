import { create } from 'zustand';

import { HistoryState } from './types';

export const useUrlStore = create<HistoryState>((set) => ({
  history: [],

  setHistory: (newHistory) =>
    set(() => ({
      history: newHistory,
    })),
}));
