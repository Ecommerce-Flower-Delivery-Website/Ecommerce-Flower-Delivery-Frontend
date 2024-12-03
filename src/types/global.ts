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
  type Product = {
    title: string;
    image: string;
    stock: number;
    price: number;
    category_id: string;
    description: string;
    accessory_array: string[];
  };
  type Order = {
    _id: string;
    cart_id: string;
    products: string[];
    total: number;
    address: string;
    isDone: boolean;
    createdAt: string;
  };
  type Cart = {
    _id: string;
    user_id: string;
    discount: number;
    status: "active" | "complete";
    totalAmount: number;
    products: string[];
    createdAt: Date | string;
  };
}
export {};
