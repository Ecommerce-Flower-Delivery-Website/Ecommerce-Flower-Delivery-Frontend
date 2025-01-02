// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { authSliceReducer } from "./slices/authSlice";
import { useDispatch } from "react-redux";
import { orderReducer } from "./slices/orderSlice";
import  productReducer  from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    orders: orderReducer,
    product: productReducer 
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useReduxDispatch = () => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
