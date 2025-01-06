declare global {
  type TUserFromBackend = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  };

  type TUsersFromBackend = TUserFromBackend[];

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
export {};
