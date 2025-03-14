import feedReducer, {
  fetchFeedsThunk,
  fetchOrderByNumberThunk,
  initialState
} from './slice';

describe('Проверка редьюсера слайса feed', () => {
  it('Проверка начального состояния', () => {
    const state = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('Проверка обработки состояния pending для fetchFeedsThunk', () => {
    const action = { type: fetchFeedsThunk.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.isFeedsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния fulfilled для fetchFeedsThunk', () => {
    const mockOrders = [
      { id: '1', ingredients: [], status: 'done', number: 1 },
      { id: '2', ingredients: [], status: 'pending', number: 2 }
    ];
    const action = {
      type: fetchFeedsThunk.fulfilled.type,
      payload: { orders: mockOrders, total: 5, totalToday: 3 }
    };
    const state = feedReducer(initialState, action);

    expect(state.isFeedsLoading).toBe(false);
    expect(state.orders).toBe(mockOrders);
    expect(state.total).toBe(5);
    expect(state.totalToday).toBe(3);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния rejected для fetchFeedsThunk', () => {
    const action = {
      type: fetchFeedsThunk.rejected.type,
      error: { message: 'Заказы не загружены' }
    };
    const state = feedReducer(initialState, action);

    expect(state.isFeedsLoading).toBe(false);
    expect(state.error).toBe('Заказы не загружены');
  });

  it('Проверка обработки состояния pending для fetchOrderByNumberThunk', () => {
    const action = {
      type: fetchOrderByNumberThunk.pending.type
    };
    const state = feedReducer(initialState, action);

    expect(state.isOrderLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния fulfilled для fetchOrderByNumberThunk', () => {
    const mockOrder = { id: '1', ingredients: [], status: 'done', number: 1 };
    const action = {
      type: fetchOrderByNumberThunk.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const state = feedReducer(initialState, action);

    expect(state.isOrderLoading).toBe(false);
    expect(state.order).toBe(mockOrder);
    expect(state.error).toBeNull();
  });

  it('Проверка обработки состояния rejected для fetchOrderByNumberThunk', () => {
    const action = {
      type: fetchOrderByNumberThunk.rejected.type,
      error: { message: 'Заказ не загружен' }
    };
    const state = feedReducer(initialState, action);

    expect(state.isOrderLoading).toBe(false);
    expect(state.error).toBe('Заказ не загружен');
  });
});
