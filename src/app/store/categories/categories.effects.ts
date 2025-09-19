import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MealService } from '../../services/meal.service';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      switchMap(() =>
        this.mealService.listCategories().pipe(
          map((categories) =>
            CategoriesActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(
              CategoriesActions.loadCategoriesFailure({
                error: error.message || 'Failed to load categories',
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
