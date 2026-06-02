export interface CrawlResult {
  siteName: string;
  siteUrl: string;
  timestamp: Date;
  prices: PriceInfo[];
}

export interface PriceInfo {
  giftCardType: 'shinsegae' | 'hyundai' | 'lotte';
  denomination: number;
  buyPrice: number;
  buyRate: number;
  sellPrice?: number;
  sellRate?: number;
}
