import { ActionReducerMap } from '@ngrx/store';
import { CategoriesState, categoriesReducer } from './categories';
import { RecipesState, recipesReducer } from './recipes';
import { AreasState, areasReducer } from './areas';
import { IngredientsState, ingredientsReducer } from './ingredients';

export interface AppState {
    categories: CategoriesState;
    recipes: RecipesState;
    areas: AreasState;
    ingredients: IngredientsState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducer,
    recipes: recipesReducer,
    areas: areasReducer,
    ingredients: ingredientsReducer,
};
