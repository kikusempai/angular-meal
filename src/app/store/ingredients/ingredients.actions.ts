import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../services/meal.service';

// Load Ingredients Actions
export const loadIngredients = createAction('[Ingredients] Load Ingredients');

export const loadIngredientsSuccess = createAction(
    '[Ingredients] Load Ingredients Success',
    props<{ ingredients: Ingredient[] }>()
);

export const loadIngredientsFailure = createAction(
    '[Ingredients] Load Ingredients Failure',
    props<{ error: string }>()
);

// Select Ingredient Action
export const selectIngredient = createAction(
    '[Ingredients] Select Ingredient',
    props<{ ingredient: string }>()
);

// Clear Selection Action
export const clearIngredientSelection = createAction('[Ingredients] Clear Ingredient Selection');
