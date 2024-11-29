// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import { authSliceReducer } from "./slices/authSlice";
// import { productReducer } from "./slices/productSlice";
import { useDispatch } from "react-redux";
import { orderReducer } from "./slices/orderSlice";
import { cartReducer } from "./slices/CartSlice";

export const store = configureStore({
  reducer: {
    // auth: authSliceReducer,
    // products: productReducer,
    orders: orderReducer,
    carts: cartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useReduxDispatch = () => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
