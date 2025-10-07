export const ProductStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ProductStatusType = typeof ProductStatus[keyof typeof ProductStatus];

export interface Product {
  id: string;
  name: string;
  mfr: string;
  description: string;
  price: number;
  sku: string;
  status: ProductStatusType;
  isProductKnown: boolean;
  isProductRejected: boolean;
}

export interface CreateProductInput {
  name: string;
  mfr: string;
  description: string;
  price: number;
  sku: string;
}
