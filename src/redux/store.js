import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import cartReducer from "./slices/CartSlice";
export const store=configureStore({
  reducer:{
    product:productReducer,
    cart: cartReducer,
  }}
)