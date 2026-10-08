import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/users";

// ========================================
// READ - Fetch Users
// ========================================
//rejectWithValue is a special function provided by Redux Toolkit's createAsyncThunk
// that lets you send a custom error value to the Redux slice when the
// asynchronous operation fails.
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// CREATE - Add User
// ========================================

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// UPDATE - Update User
// ========================================

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    try {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// DELETE - Delete User
// ========================================

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ========================================
// Slice
// ========================================

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userCount: 0, // ← NEW

    loading: false,
    adding: false,
    updating: false,
    deletingId: null,
    error: null,
  },

  //reducers: {},
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.userCount = 0;
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
        state.userCount = action.payload.length; // ← NEW
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
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
        state.userCount = state.users.length; // ← NEW
      })
      .addCase(addUser.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload || "Failed to add user";
      })
      // ==================================
      // UPDATE
      // ==================================
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload || "Failed to update user";
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
        state.userCount = state.users.length; // ← NEW
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload || "Failed to delete user";
      });
  },
});
export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
/*
| Concept             | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `createAsyncThunk`  | Handles **asynchronous operations** such as API calls      |
| `pending`           | Runs when the API request **starts**                       |
| `fulfilled`         | Runs when the API request **succeeds**                     |
| `rejected`          | Runs when the API request **fails**                        |
| `rejectWithValue()` | Sends a **custom error payload** to the `rejected` reducer |
| `extraReducers`     | Handles the `pending / fulfilled / rejected` actions       |
----------------------------------------------------
createAsyncThunk()
      ↓
   pending
      ↓
   API Call
   ↙       ↘
success    failure
  ↓          ↓
fulfilled   rejected
----------------------------------------------------
rejectWithValue is a very useful feature of Redux Toolkit's createAsyncThunk.
It lets you send a custom error payload from the rejected part 
of your API call to your Redux rejected reducer.
return rejectWithValue("Email already exists");
----------------------------------------------------
export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users", userData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add user"
      );
    }
  }
);
*/
