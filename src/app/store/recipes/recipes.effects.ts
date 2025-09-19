import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { MealService } from '../../services/meal.service';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.loadRecipes),
            switchMap(({ category, searchQuery }) => {
                let apiCall;

                if (searchQuery) {
                    apiCall = this.mealService.searchMeals(searchQuery);
                } else if (category) {
                    apiCall = this.mealService.filterByCategory(category);
                } else {
                    apiCall = this.mealService.searchMeals('chicken'); // Default search
                }

                return apiCall.pipe(
                    map((recipes) =>
                        RecipesActions.loadRecipesSuccess({ recipes })
                    ),
                    catchError((error) =>
                        of(RecipesActions.loadRecipesFailure({
                            error: error.message || 'Failed to load recipes'
                        }))
                    )
                );
            })
        )
    );

    loadRecipeById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.loadRecipeById),
            switchMap(({ id }) =>
                this.mealService.getMealById(id).pipe(
                    map((recipe) =>
                        RecipesActions.loadRecipeByIdSuccess({ recipe })
                    ),
                    catchError((error) =>
                        of(RecipesActions.loadRecipeByIdFailure({
                            error: error.message || 'Failed to load recipe details'
                        }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private mealService: MealService,
        private store: Store
    ) { }
}
