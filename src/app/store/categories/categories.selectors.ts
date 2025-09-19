import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectAllCategories = createSelector(
    selectCategoriesState,
    (state) => state.categories
);

export const selectSelectedCategory = createSelector(
    selectCategoriesState,
    (state) => state.selectedCategory
);

export const selectCategoriesLoading = createSelector(
    selectCategoriesState,
    (state) => state.loading
);

export const selectCategoriesError = createSelector(
    selectCategoriesState,
    (state) => state.error
);

export const selectCategoriesLoaded = createSelector(
    selectCategoriesState,
    (state) => state.categories.length > 0
);

export const selectCategoryNames = createSelector(
    selectAllCategories,
    (categories) => categories.map(category => category.strCategory)
);
