export interface SubscribePlan {
    _id: string;
    title: string;
    image: string;
    price: string;
    isFreeDelivery: string;
    features: string[];
    deliveryFrequency: string;
    deliveryCount: string;
    users_id: string[];
    createdAt: string;
    updatedAt: string;
}