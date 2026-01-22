import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// condition:(arg,thunkApi) ....thunkApi contains a big object....we destructure getState object which give us the access of the product Redux store.
export const fetchProduct = createAsyncThunk(
  "fetchProduct",//unique name of this api
  async () => {
    const res = await fetch(import.meta.env.VITE_PRODUCTS_BASE_URL);
    return await res.json();
  },
  {
    condition: (_, { getState }) => {
      const { products, lastFetched, isLoading } = getState().product;
      // Prevent multiple simultaneous calls
      if (isLoading) return false;
      // First load => fetch
      if (!products.length) return true;
      const now = Date.now();
      const TEN_MINUTES = 10 * 60 * 1000;
      // If data is still fresh => don't fetch
      if (now - lastFetched < TEN_MINUTES) {
        return false;
      }
      // Cache expired => fetch again
      return true;
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    isError: false,
    categories: [],
    products: [],
    filtered: [],
    lastFetched: null,
  },

  reducers: {
    filterByCategory: (state, action) => {
      if (action.payload === "All") {
        state.filtered = state.products;
      } else {
        state.filtered = state.products.filter(
          (p) => p.category === action.payload,
        );
      }
    },
    filterByInput: (state, action) => {
      const value = action.payload;
      state.filtered = state.products.filter((p) =>
        p.title.toLowerCase().includes(value.toLowerCase()),
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const prod = action.payload.products||action.payload;
      state.products = prod;
      state.filtered = prod;
      state.lastFetched = Date.now();
      state.categories = Array.from(
        new Set(prod.map((p) => p.category).filter(Boolean)),
      );
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});
export const { filterByCategory, filterByInput } = ProductSlice.actions;
export default ProductSlice.reducer;
