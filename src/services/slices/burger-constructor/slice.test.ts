import { TIngredient } from '@utils-types';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './slice';

describe('Проверка редьюсера слайса burger-consctructor', () => {
  const mockBun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockMain: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('Проверка обработки добавления булки', () => {
    const action = addIngredient(mockBun);
    const newState = burgerConstructorReducer(undefined, action);
    expect(newState.burger.bun).toEqual({
      ...mockBun,
      id: expect.any(String)
    });
  });

  it('Проверка обработки добавления начинки', () => {
    const action = addIngredient(mockMain);
    const newState = burgerConstructorReducer(undefined, action);
    expect(newState.burger.ingredients).toEqual([
      { ...mockMain, id: expect.any(String) }
    ]);
  });

  it('Проверка обработки удаления начинки', () => {
    const initialState = {
      burger: {
        bun: null,
        ingredients: [{ ...mockMain, id: '1' }]
      },
      error: null
    };

    const action = removeIngredient({ ...mockMain, id: '1' });
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.burger.ingredients).toEqual([]);
  });

  it('Проверка перемещения начинки вверх', () => {
    const initialState = {
      burger: {
        bun: null,
        ingredients: [
          { ...mockMain, id: '1' },
          { ...mockMain, id: '2' }
        ]
      },
      error: null
    };

    const action = moveIngredientUp(1);
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.burger.ingredients).toEqual([
      { ...mockMain, id: '2' },
      { ...mockMain, id: '1' }
    ]);
  });

  it('Проверка перемещения начинки вверх', () => {
    const initialState = {
      burger: {
        bun: null,
        ingredients: [
          { ...mockMain, id: '1' },
          { ...mockMain, id: '2' }
        ]
      },
      error: null
    };

    const action = moveIngredientDown(0);
    const newState = burgerConstructorReducer(initialState, action);
    expect(newState.burger.ingredients).toEqual([
      { ...mockMain, id: '2' },
      { ...mockMain, id: '1' }
    ]);
  });
});
