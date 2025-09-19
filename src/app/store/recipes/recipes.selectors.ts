import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipesState } from './recipes.reducer';

export const selectRecipesState = createFeatureSelector<RecipesState>('recipes');

export const selectAllRecipes = createSelector(
    selectRecipesState,
    (state) => state.recipes
);

export const selectSelectedRecipe = createSelector(
    selectRecipesState,
    (state) => state.selectedRecipe
);

export const selectCurrentRecipe = createSelector(
    selectRecipesState,
    (state) => state.currentRecipe
);

export const selectRecipesLoading = createSelector(
    selectRecipesState,
    (state) => state.loading
);

export const selectRecipeLoading = createSelector(
    selectRecipesState,
    (state) => state.loadingRecipe
);

export const selectRecipesError = createSelector(
    selectRecipesState,
    (state) => state.error
);

export const selectRecipeError = createSelector(
    selectRecipesState,
    (state) => state.recipeError
);

export const selectRecipesLoaded = createSelector(
    selectRecipesState,
    (state) => state.recipes.length > 0
);

export const selectCurrentSearchQuery = createSelector(
    selectRecipesState,
    (state) => state.searchQuery
);

export const selectCurrentCategory = createSelector(
    selectRecipesState,
    (state) => state.category
);

export const selectRecipesByCategory = createSelector(
    selectAllRecipes,
    selectCurrentCategory,
    (recipes, category) => {
        if (!category) return recipes;
        return recipes.filter(recipe => recipe.strCategory === category);
    }
);

export const selectRecipeById = createSelector(
    selectAllRecipes,
    (recipes: any[], props: { id: string }) => {
        return recipes.find(recipe => recipe.idMeal === props.id);
    }
);
