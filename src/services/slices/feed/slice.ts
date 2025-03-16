import { getFeedsApi, getOrderByNumberApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchFeedsThunk = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const fetchOrderByNumberThunk = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);

export type TFeedState = {
  order: TOrder | null;
  orders: TOrder[];
  isFeedsLoading: boolean;
  isOrderLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
};

export const initialState: TFeedState = {
  order: null,
  orders: [],
  isFeedsLoading: false,
  isOrderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    orderSelector: (state) => state.order,
    ordersListSelector: (state) => state.orders,
    isLoadingOrderSelector: (state) => state.isOrderLoading,
    isLoadingFeedsSelector: (state) => state.isFeedsLoading,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Загрузка списка заказов
      .addCase(fetchFeedsThunk.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchFeedsThunk.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchFeedsThunk.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      // Загрузка одного заказа
      .addCase(fetchOrderByNumberThunk.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrderByNumberThunk.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrderByNumberThunk.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const {
  orderSelector,
  ordersListSelector,
  isLoadingOrderSelector,
  isLoadingFeedsSelector,
  totalSelector,
  totalTodaySelector
} = feedSlice.selectors;
export default feedSlice.reducer;
