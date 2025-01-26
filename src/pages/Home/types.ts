export interface IUrlProps {
  originalUrl: string;
  description?: string;
}

export interface IShortenUrlProps {
  id: number;
  originalUrl: string;
  shortUrl: string;
  description: string;
  createdAt: Date;
}
