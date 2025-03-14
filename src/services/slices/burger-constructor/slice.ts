import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBurgerConstructorState = {
  burger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
};

const initialState: TBurgerConstructorState = {
  burger: {
    bun: null,
    ingredients: []
  },
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state) => state.burger
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burger.bun = action.payload;
        } else {
          state.burger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const key = nanoid();
        return { payload: { ...ingredient, id: key } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burger.ingredients = state.burger.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearBurgerConstructor: (state) => {
      state.burger.bun = null;
      state.burger.ingredients = [];
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.burger.ingredients.length) {
        [state.burger.ingredients[index - 1], state.burger.ingredients[index]] =
          [
            state.burger.ingredients[index],
            state.burger.ingredients[index - 1]
          ];
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.burger.ingredients.length - 1) {
        [state.burger.ingredients[index], state.burger.ingredients[index + 1]] =
          [
            state.burger.ingredients[index + 1],
            state.burger.ingredients[index]
          ];
      }
    }
  }
});

export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
export const {
  addIngredient,
  removeIngredient,
  clearBurgerConstructor,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;
