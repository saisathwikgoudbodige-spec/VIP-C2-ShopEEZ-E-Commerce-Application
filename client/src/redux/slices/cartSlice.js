import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  cart: { items: [], totalPrice: 0 },
  loading: false,
  error: null
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get('/cart');
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post('/cart/add', { productId, quantity });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const updateCartItemQty = createAsyncThunk('cart/updateCartItemQty', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.put('/cart/update', { productId, quantity });
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (productId, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete(`/cart/remove/${productId}`);
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

export const clearUserCart = createAsyncThunk('cart/clearUserCart', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.delete('/cart/clear');
    return data.cart;
  } catch (error) {
    return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || { items: [], totalPrice: 0 };
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || { items: [], totalPrice: 0 };
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.cart = action.payload || { items: [], totalPrice: 0 };
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = action.payload || { items: [], totalPrice: 0 };
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.cart = action.payload || { items: [], totalPrice: 0 };
      });
  }
});

export default cartSlice.reducer;
