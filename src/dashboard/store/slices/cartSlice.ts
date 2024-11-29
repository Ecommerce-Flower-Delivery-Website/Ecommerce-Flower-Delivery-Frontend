import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartStateType = {
  carts: Cart[];
};

const initialState: CartStateType = {
  carts: [
    {
      _id: "cart_1",
      user_id: "user_123",
      discount: 10,
      status: "active",
      totalAmount: 100,
      products: ["prod_1", "prod_2"],
      createdAt: `new Date("2024-11-01")`,
    },
    {
      _id: "cart_2",
      user_id: "user_456",
      discount: 15,
      status: "complete",
      totalAmount: 200,
      products: ["prod_3"],
      createdAt: `new Date("2024-11-10")`,
    },
    {
      _id: "cart_3",
      user_id: "user_789",
      discount: 5,
      status: "active",
      totalAmount: 150,
      products: ["prod_1", "prod_3"],
      createdAt: `new Date("2024-11-20")`,
    },
    {
      _id: "cart_4",
      user_id: "user_101",
      discount: 20,
      status: "complete",
      totalAmount: 300,
      products: ["prod_2"],
      createdAt: `new Date("2024-11-25")`,
    },
    {
      _id: "cart_5",
      user_id: "user_202",
      discount: 0,
      status: "active",
      totalAmount: 50,
      products: [],
      createdAt: `new Date("2024-11-28")`,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<Omit<Omit<Cart, "_id">, "createdAt">>
    ) => {
      const newCart: Cart = {
        _id: crypto.randomUUID(),
        createdAt: `${new Date()}`,
        ...action.payload,
      };
      state.carts.push(newCart);
      console.log("Cart created:", newCart);
    },

    update: (
      state,
      action: PayloadAction<{ _id: string; data: Partial<Cart> }>
    ) => {
      const { _id, data } = action.payload;
      const index = state.carts.findIndex((cart) => cart._id === _id);
      if (index !== -1) {
        state.carts[index] = {
          ...state.carts[index],
          ...data,
        };
        console.log("Cart updated:", state.carts[index]);
      }
    },

    delete: (state, action: PayloadAction<string>) => {
      state.carts = state.carts.filter((cart) => cart._id !== action.payload);
      console.log("Cart deleted with ID:", action.payload);
    },
  },
});

export const {
  create: createCart,
  update: updateCart,
  delete: removeCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
