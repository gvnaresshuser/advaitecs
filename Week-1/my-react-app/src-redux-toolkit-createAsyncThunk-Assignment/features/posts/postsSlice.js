// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch a post
export const fetchPost = createAsyncThunk('posts/fetchPost', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        post: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default postsSlice.reducer;
