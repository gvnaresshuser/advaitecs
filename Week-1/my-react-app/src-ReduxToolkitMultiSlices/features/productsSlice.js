import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api/products';

// Thunks
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await axios.get(baseURL);
    return res.data;
});

export const addProduct = createAsyncThunk('products/add', async (product) => {
    const res = await axios.post(baseURL, product);
    return res.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, name, price }) => {
    await axios.put(`${baseURL}/${id}`, { name, price });
    return { id, updatedData: { name, price } };
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return id;
});

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // addProduct
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // updateProduct
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.list.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = { ...state.list[index], ...action.payload.updatedData };
                }
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // deleteProduct
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter(p => p.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default productsSlice.reducer;
