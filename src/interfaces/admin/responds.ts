export interface IProduct {
  _id: string;
  code: string;
  name: string;
  bin_location: string;
  expiration_date: Date;
  initial_stock: number;
  comment?: string;
  current_stock?: number;
  last_withdrawal?: number;
  warehouse_ID: string;
  created_at: Date;
}

export interface IGood {
  _id: string;
  vendorName: string;
  deliveryDate: string;
  purchaseOrderNumber: string;
  invoiceNumber: string;
  warehouseId: string;
  name: string;
  description?: string;
  purchasePrice: number;
  expirationDate?: string;
  quantity: number;
  totalAmount: number;
}
