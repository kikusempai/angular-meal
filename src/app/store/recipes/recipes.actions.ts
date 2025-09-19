import { createAction, props } from '@ngrx/store';
import { Meal } from '../../services/meal.service';

// Load Recipes Actions
export const loadRecipes = createAction(
  '[Recipes] Load Recipes',
  props<{
    category?: string;
    searchQuery?: string;
    area?: string;
    ingredient?: string;
  }>()
);

export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: Meal[] }>()
);

export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: string }>()
);

export const loadRecipeById = createAction(
  '[Recipes] Load Recipe By ID',
  props<{ id: string }>()
);

export const loadRecipeByIdSuccess = createAction(
  '[Recipes] Load Recipe By ID Success',
  props<{ recipe: Meal }>()
);

export const loadRecipeByIdFailure = createAction(
  '[Recipes] Load Recipe By ID Failure',
  props<{ error: string }>()
);

export const selectRecipe = createAction(
  '[Recipes] Select Recipe',
  props<{ recipe: Meal }>()
);

export const clearRecipes = createAction('[Recipes] Clear Recipes');

export const clearRecipeSelection = createAction(
  '[Recipes] Clear Recipe Selection'
);
