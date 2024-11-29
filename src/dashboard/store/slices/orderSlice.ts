import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderStateType = {
  orders: Order[];
};

const initialState: OrderStateType = {
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<Omit<Omit<Order, "_id">, "createdAt">>
    ) => {
      state.orders.push({
        _id: crypto.randomUUID(),
        createdAt: `${new Date()}`,
        ...action.payload,
      });
      console.log("create : ", action.payload);
    },

    update: (
      state,
      action: PayloadAction<{ _id: string; data: Partial<Order> }>
    ) => {
      const { _id, data } = action.payload;
      const index = state.orders.findIndex((order) => order._id === _id);
      if (index !== -1) {
        state.orders[index] = {
          ...state.orders[index],
          ...data,
        };
      }
      console.log("update : ", data);
    },

    delete: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
  },
});

export const {
  create: createOrder,
  update: updateOrder,
  delete: removeOrder,
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
