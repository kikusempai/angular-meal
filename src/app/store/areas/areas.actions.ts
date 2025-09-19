import { createAction, props } from '@ngrx/store';
import { Area } from '../../services/meal.service';

export const loadAreas = createAction('[Areas] Load Areas');

export const loadAreasSuccess = createAction(
  '[Areas] Load Areas Success',
  props<{ areas: Area[] }>()
);

export const loadAreasFailure = createAction(
  '[Areas] Load Areas Failure',
  props<{ error: string }>()
);

export const selectArea = createAction(
  '[Areas] Select Area',
  props<{ area: string }>()
);

export const clearAreaSelection = createAction('[Areas] Clear Area Selection');
