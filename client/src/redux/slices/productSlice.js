import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  products: [],
  featuredProducts: [],
  categories: [],
  productDetail: null,
  reviews: [],
  page: 1,
  pages: 1,
  total: 0,
  loading: false,
  error: null,
  success: false
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (queryParams = {}, { rejectWithValue }) => {
    try {
      const { search = '', category = '', minPrice = '', maxPrice = '', rating = '', sort = '', page = 1 } = queryParams;
      let url = `/products?search=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&rating=${rating}&sort=${sort}&pageNumber=${page}`;
      const { data } = await axiosInstance.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'product/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/products/featured');
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/products/categories');
      return data.categories;
    } catch (error) {
      return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }
);

export const addProductReview = createAsyncThunk(
  'product/addProductReview',
  async ({ id, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/products/${id}/review`, { rating, comment });
      return data;
    } catch (error) {
      return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.productDetail = null;
        state.reviews = [];
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload.product;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
