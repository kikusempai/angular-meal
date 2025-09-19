import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientsState } from './ingredients.reducer';

export const selectIngredientsState = createFeatureSelector<IngredientsState>('ingredients');

export const selectAllIngredients = createSelector(
    selectIngredientsState,
    (state) => state.ingredients
);

export const selectSelectedIngredient = createSelector(
    selectIngredientsState,
    (state) => state.selectedIngredient
);

export const selectIngredientsLoading = createSelector(
    selectIngredientsState,
    (state) => state.loading
);

export const selectIngredientsError = createSelector(
    selectIngredientsState,
    (state) => state.error
);

export const selectIngredientsLoaded = createSelector(
    selectIngredientsState,
    (state) => state.ingredients.length > 0
);

export const selectIngredientNames = createSelector(
    selectAllIngredients,
    (ingredients) => ingredients.map(ingredient => ingredient.strIngredient)
);
