export interface UrlState {
  originalUrl: string;
  shortUrl: string;
  showShortUrlCard: boolean;
  setShortUrl: (shortUrl: string) => void;
  setShowShortUrlCard: (value: boolean) => void;
}

export interface HistoryState {
  history: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    originalUrl: string;
    shortUrl: string;
    description?: string;
  }[];
  setHistory: (
    history: {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      originalUrl: string;
      shortUrl: string;
      description?: string;
    }[]
  ) => void;
}
