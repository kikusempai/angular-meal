import { createAction, props } from '@ngrx/store';
import { Meal } from '../../services/meal.service';

// Load Recipes Actions
export const loadRecipes = createAction(
    '[Recipes] Load Recipes',
    props<{ category?: string; searchQuery?: string }>()
);

export const loadRecipesSuccess = createAction(
    '[Recipes] Load Recipes Success',
    props<{ recipes: Meal[] }>()
);

export const loadRecipesFailure = createAction(
    '[Recipes] Load Recipes Failure',
    props<{ error: string }>()
);

// Load Recipe by ID Actions
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

// Select Recipe Action
export const selectRecipe = createAction(
    '[Recipes] Select Recipe',
    props<{ recipe: Meal }>()
);

// Clear Recipes Action
export const clearRecipes = createAction('[Recipes] Clear Recipes');

// Clear Selection Action
export const clearRecipeSelection = createAction('[Recipes] Clear Recipe Selection');
