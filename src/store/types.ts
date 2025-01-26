export interface UrlState {
  originalUrl: string;
  shortUrl: string;
  showShortUrlCard: boolean;
  setShortUrl: (shortUrl: string) => void;
  setShowShortUrlCard: (value: boolean) => void;
}

// export interface UrlState {
//   history: { shortUrl: string; originalUrl: string }[];
//   setHistory: (history: { shortUrl: string; longUrl: string }[]) => void;
// }
