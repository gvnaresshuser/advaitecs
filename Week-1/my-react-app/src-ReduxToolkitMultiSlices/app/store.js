import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productsReducer from "../features/productsSlice";
import inventoryReducer from "../features/inventorySlice";
import productInventoryReducer from "../features/productInventorySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    inventory: inventoryReducer,
    productInventory: productInventoryReducer,
  },
});
