// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    //const res = await fetch('https://jsonplaceholder.typicode.com/invalid-url'); // <-- intentionally broken
    // Simulate error
    //throw new Error('Simulated API error: Unable to fetch user data');

    return await res.json();
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
