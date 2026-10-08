import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { name: 'Naresh', email: 'test@test.com' },
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }
});
export const { setUser } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});