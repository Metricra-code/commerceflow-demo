export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export const STOCK_STATUS_LABEL: Record<StockStatus, string> = {
  IN_STOCK: 'In stock',
  LOW_STOCK: 'Low stock',
  OUT_OF_STOCK: 'Out of stock'
};

export interface Product {
  code: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string;
  stockStatus: StockStatus;
}

export interface OccProductListResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalResults: number;
  };
}
