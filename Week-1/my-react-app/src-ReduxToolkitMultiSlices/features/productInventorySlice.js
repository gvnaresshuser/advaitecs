import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL =
  "http://localhost:5000/api/product-inventory";

// ==============================
// FETCH PRODUCTS + INVENTORY
// ==============================

export const fetchProductInventory = createAsyncThunk(
  "productInventory/fetchProductInventory",

  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch product inventory"
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==============================
// SLICE
// ==============================

const productInventorySlice = createSlice({
  name: "productInventory",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // PENDING
      .addCase(
        fetchProductInventory.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // FULFILLED
      .addCase(
        fetchProductInventory.fulfilled,
        (state, action) => {
          state.loading = false;
          state.list = action.payload;
        }
      )

      // REJECTED
      .addCase(
        fetchProductInventory.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default productInventorySlice.reducer;

