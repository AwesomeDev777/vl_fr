export interface IProduct {
  code: string;
  name: string;
  bin_location: string;
  expiration_date?: string;
  initial_stock: number;
  comment: string;
  current_stock?: number;
  last_withdrawal?: number;
}

export interface IGood {
  vendorName: string;
  deliveryDate: string;
  purchaseOrderNumber: string;
  invoiceNumber: string;
  warehouseId: any;
  name: string;
  description?: string;
  purchasePrice: number;
  expirationDate?: string;
  quantity: number;
  totalAmount: number;
}
