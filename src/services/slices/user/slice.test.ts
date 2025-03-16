import userReducer, {
  fetchOrderThunk,
  fetchUserThunk,
  initialState,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  resetError,
  updateUserInfoThunk
} from './slice';

describe('Проверка редьюсера слайса user', () => {
  it('Проверка начального состояния', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('Проверка обработки состояния pending для registerUserThunk', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.loginRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния fulfilled для registerUserThunk', () => {
    const mockUser = { name: 'user', email: 'user@example.com' };
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.loginRequest).toBe(false);
    expect(state.user).toBe(mockUser);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния rejected для registerUserThunk', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(false);
    expect(state.loginRequest).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('Проверка обработки состояния pending для loginUserThunk', () => {
    const action = {
      type: loginUserThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния fulfilled для loginUserThunk', () => {
    const mockUser = { name: 'user', email: 'user@example.com' };
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(false);
    expect(state.isAuth).toBe(true);
    expect(state.user).toBe(mockUser);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния rejected для loginUserThunk', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(false);
    expect(state.error).toBe('Ошибка авторизации');
  });

  it('Проверка обработки состояния fulfilled для logoutUserThunk', () => {
    const stateUser = {
      ...initialState,
      user: { name: 'user', email: 'user@example.com' },
      isAuth: true
    };
    const action = {
      type: logoutUserThunk.fulfilled.type
    };
    const state = userReducer(stateUser, action);

    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния pending для updateUserInfoThunk', () => {
    const action = {
      type: updateUserInfoThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.loginRequest).toBe(true);
  });

  it('Проверка обработки состояния fulfilled для updateUserInfoThunk', () => {
    const mockUpdateUser = { name: 'user1', email: 'user1@example.com' };
    const action = {
      type: updateUserInfoThunk.fulfilled.type,
      payload: { user: mockUpdateUser }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.user).toBe(mockUpdateUser);
    expect(state.loginRequest).toBe(false);
  });

  it('Проверка обработки состояния rejected для updateUserInfoThunk', () => {
    const action = {
      type: updateUserInfoThunk.rejected.type,
      error: { message: 'Ошибка обновления данных пользователя' }
    };
    const state = userReducer(initialState, action);
    expect(state.error).toBe('Ошибка обновления данных пользователя');
  });

  it('Проверка обработки состояния pending для fetchUserThunk', () => {
    const action = {
      type: fetchUserThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(false);
  });

  it('Проверка обработки состояния fulfilled для fetchUserThunk', () => {
    const mockUser = { name: 'user', email: 'user@example.com' };
    const action = {
      type: fetchUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBe(mockUser);
  });

  it('Проверка обработки состояния rejected для fetchUserThunk', () => {
    const action = {
      type: fetchUserThunk.rejected.type,
      error: { message: 'Ошибка получения данных пользователя' }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
    expect(state.error).toBe('Ошибка получения данных пользователя');
  });

  it('Проверка обработки состояния pending для fetchOrderThunk', () => {
    const action = {
      type: fetchOrderThunk.pending.type
    };
    const state = userReducer(initialState, action);

    expect(state.orderRequest).toBe(true);
  });

  it('Проверка обработки состояния fulfilled для fetchOrderThunk', () => {
    const mockOrders = {
      _id: '1',
      ingridients: [],
      number: 1,
      status: 'done'
    };
    const action = {
      type: fetchOrderThunk.fulfilled.type,
      payload: mockOrders
    };
    const state = userReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orders).toBe(mockOrders);
  });

  it('Проверка обработки состояния rejected для fetchOrderThunk', () => {
    const action = {
      type: fetchOrderThunk.rejected.type,
      error: { message: 'Ошибка получения заказов' }
    };
    const state = userReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка получения заказов');
  });

  it('Проверка работы resetError', () => {
    const stateError = { ...initialState, error: 'Произошла ошибка' };
    const state = userReducer(stateError, resetError());
    expect(state.error).toBeNull();
  });
});
