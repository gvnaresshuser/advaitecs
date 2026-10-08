import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/users";

//ASYNC THUNKS - DEFINED OUTSIDE THE SLICE
// ================================
// READ - Fetch Users
// ================================
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
});
// ================================
// CREATE - Add User
// ================================
export const addUser = createAsyncThunk("users/addUser", async (user) => {
  console.log(user);
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  return response.json();
});
// ================================
// UPDATE - Update User
// ================================
export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const response = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
});
// ================================
// DELETE - Delete User
// ================================
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  console.log(id);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return id;
});
// ================================
// Slice
// ================================
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    adding: false,
    updatingId: null,
    deletingId: null,
    error: null,
  },
  // SYNCHRONOUS REDUCERS - DEFINED INSIDE THE SLICE
  //reducers: {},
  reducers: {
    // Synchronous Actions
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ==================================
      // READ
      // ==================================
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      // ==================================
      // CREATE
      // ==================================
      .addCase(addUser.pending, (state) => {
        state.adding = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.adding = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.adding = false;
        state.error = action.error.message || "Failed to add user";
      })

      // ==================================
      // UPDATE
      // ==================================
      .addCase(updateUser.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatingId = null;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatingId = null;
        state.error = action.error.message || "Failed to update user";
      })

      // ==================================
      // DELETE
      // ==================================
      .addCase(deleteUser.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deletingId = null;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.error.message || "Failed to delete user";
      });
  },
});

// Export the synchronous action
export const { clearUsers } = usersSlice.actions;

// Export the reducer
export default usersSlice.reducer;
/*
reducers = actions that you define inside your slice.

extraReducers = actions that are defined somewhere else, but your slice wants 
to respond to them.
*/
