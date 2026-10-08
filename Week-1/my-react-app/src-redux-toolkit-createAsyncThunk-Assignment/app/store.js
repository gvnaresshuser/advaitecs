// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postsSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        posts: postReducer,
    },
});
