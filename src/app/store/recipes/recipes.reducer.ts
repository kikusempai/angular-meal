import { createReducer, on } from '@ngrx/store';
import { Meal } from '../../services/meal.service';
import * as RecipesActions from './recipes.actions';

export interface RecipesState {
  recipes: Meal[];
  selectedRecipe: Meal | null;
  currentRecipe: Meal | null;
  loading: boolean;
  loadingRecipe: boolean;
  error: string | null;
  recipeError: string | null;
  searchQuery: string | null;
  category: string | null;
}

export const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  currentRecipe: null,
  loading: false,
  loadingRecipe: false,
  error: null,
  recipeError: null,
  searchQuery: null,
  category: null,
};

export const recipesReducer = createReducer(
  initialState,

  // Load Recipes
  on(RecipesActions.loadRecipes, (state, { category, searchQuery }) => ({
    ...state,
    loading: true,
    error: null,
    category: category || null,
    searchQuery: searchQuery || null,
  })),

  on(RecipesActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
    error: null,
  })),

  on(RecipesActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Recipe by ID
  on(RecipesActions.loadRecipeById, (state, { id }) => ({
    ...state,
    loadingRecipe: true,
    recipeError: null,
  })),

  on(RecipesActions.loadRecipeByIdSuccess, (state, { recipe }) => ({
    ...state,
    currentRecipe: recipe,
    loadingRecipe: false,
    recipeError: null,
  })),

  on(RecipesActions.loadRecipeByIdFailure, (state, { error }) => ({
    ...state,
    loadingRecipe: false,
    recipeError: error,
  })),

  // Select Recipe
  on(RecipesActions.selectRecipe, (state, { recipe }) => ({
    ...state,
    selectedRecipe: recipe,
  })),

  on(RecipesActions.clearRecipes, (state) => ({
    ...state,
    recipes: [],
    searchQuery: null,
    category: null,
  })),

  on(RecipesActions.clearRecipeSelection, (state) => ({
    ...state,
    selectedRecipe: null,
  }))
);
