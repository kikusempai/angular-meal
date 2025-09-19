import { createAction, props } from '@ngrx/store';
import { Category } from '../../services/meal.service';

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: string }>()
);

export const selectCategory = createAction(
  '[Categories] Select Category',
  props<{ category: string }>()
);

export const clearCategorySelection = createAction(
  '[Categories] Clear Category Selection'
);
