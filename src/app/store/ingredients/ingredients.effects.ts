import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MealService } from '../../services/meal.service';
import * as IngredientsActions from './ingredients.actions';

@Injectable()
export class IngredientsEffects {
  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientsActions.loadIngredients),
      switchMap(() =>
        this.mealService.listIngredients().pipe(
          map((ingredients) =>
            IngredientsActions.loadIngredientsSuccess({ ingredients })
          ),
          catchError((error) =>
            of(
              IngredientsActions.loadIngredientsFailure({
                error: error.message || 'Failed to load ingredients',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mealService: MealService,
    private store: Store
  ) {}
}
