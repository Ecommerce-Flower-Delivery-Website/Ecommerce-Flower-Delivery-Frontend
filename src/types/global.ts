declare global {

  
  type User = {
    _id: string;
    name: string;
    email: string;
    subscriptions: string;
    verified: boolean;
    isAdmin: boolean;
    createdAt: Date | string;
  };
  type SubProduct = {
    _id: string;
    price: number;
    quantity: number;
    name: string;
    image: string;
  };

  type Address = {
    street: string;
    apartmentNumber: number;
    _id: string;
  };

  type Product = {
    title: string;
    image: string;
    priceAfterDiscount: number;
    discount?: number; // Optional, as it's missing in one product
    quantity: number;
    _id: string;
  };

  type Cart = {
    _id: string;
    hasDiscount: boolean;
    totalAmount: number;
    product_array: Product[];
    user_id: string;
  };
}

export interface PaginationInfo {
  totalPlans: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export {};
