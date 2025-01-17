import { PaginationInfo } from "./global";

export interface SubscribePlan {
    _id: string;
    title: string;
    image: string;
    price: string;
    isFreeDelivery: string;
    features: string[];
    deliveryFrequency: string;
    deliveryCount: string;
    users_id: User[];
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    createdAt: string; // Assuming it's stored as ISO string
    updatedAt: string; // Assuming it's stored as ISO string
    __v: number;
    isReminder: boolean;
    subscribe_id: string;
  }

  
export interface ResponseDataSubscribePlan {
    subscribePlans: SubscribePlan[];
    pagination: PaginationInfo;
  }