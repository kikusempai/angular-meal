import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../services/meal.service';
import * as IngredientsActions from './ingredients.actions';

export interface IngredientsState {
  ingredients: Ingredient[];
  selectedIngredient: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  selectedIngredient: null,
  loading: false,
  error: null,
};

export const ingredientsReducer = createReducer(
  initialState,

  on(IngredientsActions.loadIngredients, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(IngredientsActions.loadIngredientsSuccess, (state, { ingredients }) => ({
    ...state,
    ingredients,
    loading: false,
    error: null,
  })),

  on(IngredientsActions.loadIngredientsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(IngredientsActions.selectIngredient, (state, { ingredient }) => ({
    ...state,
    selectedIngredient: ingredient,
  })),

  on(IngredientsActions.clearIngredientSelection, (state) => ({
    ...state,
    selectedIngredient: null,
  }))
);
