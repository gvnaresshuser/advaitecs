import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api/inventory';

// Thunks
export const fetchInventory = createAsyncThunk('inventory/fetch', async () => {
    const res = await axios.get(baseURL);
    return res.data;
});

export const addInventory = createAsyncThunk('inventory/add', async (item) => {
    const { productId, quantity } = item;
    const res = await axios.post(baseURL, {
        product_id: productId,
        quantity,
    });
    return res.data;
});

export const updateInventory = createAsyncThunk(
    'inventory/update',
    async ({ id, productId, quantity }) => {
        await axios.put(`${baseURL}/${id}`, {
            product_id: productId,
            quantity,
        });
        return { id, updatedData: { productId, quantity } };
    }
);

export const deleteInventory = createAsyncThunk('inventory/delete', async (id) => {
    await axios.delete(`${baseURL}/${id}`);
    return id;
});

// Slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchInventory
            .addCase(fetchInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // addInventory
            .addCase(addInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addInventory.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.loading = false;
            })
            .addCase(addInventory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // updateInventory
            .addCase(updateInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInventory.fulfilled, (state, action) => {
                const index = state.list.findIndex(i => i.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = { ...state.list[index], ...action.payload.updatedData };
                }
                state.loading = false;
            })
            .addCase(updateInventory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })

            // deleteInventory
            .addCase(deleteInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInventory.fulfilled, (state, action) => {
                state.list = state.list.filter(i => i.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteInventory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default inventorySlice.reducer;
