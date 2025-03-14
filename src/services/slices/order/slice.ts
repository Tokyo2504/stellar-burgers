import { orderBurgerApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchOrderBurgerThunk = createAsyncThunk(
  'orders/postOrderBurger',
  async (data: Array<string>) => orderBurgerApi(data)
);

export type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    orderSelector: (state) => state.order,
    isLoadingOrderSelector: (state) => state.isLoading
  },
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurgerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrderBurgerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      });
  }
});

export const { orderSelector, isLoadingOrderSelector } = orderSlice.selectors;
export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
