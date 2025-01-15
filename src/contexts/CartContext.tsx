import React, { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/ajax/api";

type CartItem = {
  productId: string;
  accessoriesId?: string[];
  quantity: number;
};

type CartData = {
  items: CartItem[];
  priceAll?: number;
  priceAllAfterDiscount?: number;
};

type AddItemPayload = {
  productId: string;
  accessoriesId?: string[];
  quantity: number;
};

type UpdateQuantityPayload = {
  productId: string;
  quantity: number;
};

const fetchCart = async (): Promise<CartData> => {
  const response = await api.get("/cart");
  return response.data.data;
};

const addItemToCart = async (item: AddItemPayload) => {
  await api.post("/cart", item);
};

const removeItemFromCart = async (productId: string) => {
  await api.delete(`/cart/${productId}`);
};

const updateItemQuantity = async (payload: UpdateQuantityPayload) => {
  const { productId, quantity } = payload;
  await api.put(`/cart/${productId}`, { quantity });
};

type CartContextType = {
  data: CartData | undefined;
  isLoading: boolean;
  isError: boolean;
  addItem: (item: AddItemPayload) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (payload: UpdateQuantityPayload) => void;
  refetch: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const addItemMutation = useMutation({
    mutationFn: addItemToCart,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartData>(["cart"]);

      if (previousCart) {
        queryClient.setQueryData(["cart"], {
          ...previousCart,
          items: [...previousCart.items, newItem],
        });
      }

      return { previousCart };
    },
    onError: (_err, _newItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: removeItemFromCart,
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartData>(["cart"]);

      if (previousCart) {
        queryClient.setQueryData(["cart"], {
          ...previousCart,
          items: previousCart.items.filter(
            (item) => item.productId !== productId
          ),
        });
      }

      return { previousCart };
    },
    onError: (_err, _productId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: updateItemQuantity,
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartData>(["cart"]);

      if (previousCart) {
        queryClient.setQueryData(["cart"], {
          ...previousCart,
          items: previousCart.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      }

      return { previousCart };
    },
    onError: (_err, _updatedItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const addItem = (item: AddItemPayload) => addItemMutation.mutate(item);
  const removeItem = (productId: string) =>
    removeItemMutation.mutate(productId);
  const updateQuantity = (payload: UpdateQuantityPayload) =>
    updateQuantityMutation.mutate(payload);

  return (
    <CartContext.Provider
      value={{
        data,
        isLoading,
        isError,
        addItem,
        removeItem,
        updateQuantity,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
