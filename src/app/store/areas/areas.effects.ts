import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MealService } from '../../services/meal.service';
import * as AreasActions from './areas.actions';

@Injectable()
export class AreasEffects {
  loadAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AreasActions.loadAreas),
      switchMap(() =>
        this.mealService.listAreas().pipe(
          map((areas) => AreasActions.loadAreasSuccess({ areas })),
          catchError((error) =>
            of(
              AreasActions.loadAreasFailure({
                error: error.message || 'Failed to load areas',
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
