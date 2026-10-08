import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

// Thunks
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const addUser = createAsyncThunk('user/addUser', async (user) => {
    await axios.post(BASE_URL, user);
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, name, email }) => {
    await axios.put(`${BASE_URL}/${id}`, { name, email });
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    const res = await axios.get(BASE_URL);
    return res.data;
});

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: { users: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchUsers
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // addUser
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
