import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Complete Redux state type
export type RootState = ReturnType<typeof store.getState>;

// Redux dispatch type
export type AppDispatch = typeof store.dispatch;