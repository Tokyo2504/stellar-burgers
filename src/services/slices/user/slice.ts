import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const fetchUserThunk = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUserInfoThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) =>
    await loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', () => {
  logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

export const fetchOrderThunk = createAsyncThunk(
  'user/getUserOrders',
  async () => getOrdersApi()
);

export type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  orders: TOrder[];
  orderRequest: boolean;
  loginRequest: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuth: false,
  orders: [],
  orderRequest: false,
  loginRequest: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    userSelector: (state) => state.user,
    nameSelector: (state) => state.user?.name || '',
    emailSelector: (state) => state.user?.email || '',
    isAuthSelector: (state) => state.isAuth,
    loginRequestSelector: (state) => state.loginRequest,
    ordersSelector: (state) => state.orders,
    ordersRequestSelector: (state) => state.orderRequest,
    errorSelector: (state) => state.error
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      // Регистрация пользователя
      .addCase(registerUserThunk.pending, (state) => {
        state.isAuth = false;
        state.loginRequest = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.loginRequest = false;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.loginRequest = false;
        state.user = action.payload;
      })
      // Авторизация пользователя
      .addCase(loginUserThunk.pending, (state) => {
        state.loginRequest = true;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginRequest = false;
        state.error = action.error.message!;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      // Выход пользователя из профиля
      .addCase(logoutUserThunk.pending, (state) => {
        state.loginRequest = false;
        state.isAuth = false;
        state.user = null;
      })
      // Обновление данных пользователя
      .addCase(updateUserInfoThunk.pending, (state) => {
        state.loginRequest = true;
      })
      .addCase(updateUserInfoThunk.rejected, (state, action) => {
        state.loginRequest = false;
        state.error = action.error.message!;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      // Получение данных пользователя
      .addCase(fetchUserThunk.pending, (state) => {
        state.loginRequest = true;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loginRequest = false;
        state.user = null;
        state.error = action.error.message!;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loginRequest = false;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      // Получение данных о заказах пользователя
      .addCase(fetchOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message!;
      })
      .addCase(fetchOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      });
  }
});

export const {
  userSelector,
  nameSelector,
  emailSelector,
  isAuthSelector,
  loginRequestSelector,
  ordersSelector,
  ordersRequestSelector,
  errorSelector
} = userSlice.selectors;
export const { resetError } = userSlice.actions;
export default userSlice.reducer;
