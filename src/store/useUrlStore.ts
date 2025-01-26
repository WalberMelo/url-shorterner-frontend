import { create } from 'zustand';

import { UrlState } from './types';

export const useUrlStore = create<UrlState>((set) => ({
  originalUrl: "",
  shortUrl: "",
  description: "",
  showShortUrlCard: false,
  setShortUrl: (shortUrl) => set(() => ({ shortUrl })),
  setShowShortUrlCard: (value) => {
    set(() => ({ showShortUrlCard: value }));
  },
}));
