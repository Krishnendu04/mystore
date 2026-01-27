import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DISCOUNT_MAP } from "../../config/discounts";

export const fetchProduct = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await fetch(import.meta.env.VITE_PRODUCTS_BASE_URL);
    const json = await res.json();

    const products = json.products;

    return products.map((p) => {
      const discount = DISCOUNT_MAP[p.id] || 0;

      const discountedPrice = discount
        ? +(p.price - (p.price * discount) / 100).toFixed(2)
        : p.price;

      return {
        ...p,
        discount,
        discountedPrice,
      };
    });
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.categories = [...new Set(action.payload.map((p) => p.category))];
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default ProductSlice.reducer;
