declare global {
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
}
export {};
