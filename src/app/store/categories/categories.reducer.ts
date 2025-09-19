import { createReducer, on } from '@ngrx/store';
import { Category } from '../../services/meal.service';
import * as CategoriesActions from './categories.actions';

export interface CategoriesState {
  categories: Category[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CategoriesState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const categoriesReducer = createReducer(
  initialState,

  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: null,
  })),

  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CategoriesActions.selectCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),

  on(CategoriesActions.clearCategorySelection, (state) => ({
    ...state,
    selectedCategory: null,
  }))
);
