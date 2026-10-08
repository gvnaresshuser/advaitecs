import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import usersReducer from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
});
//USE THIS STORE NAME FOR GETTING THE STATE FROM THE STORE
// const count = useSelector((state) => state.counter.count);
