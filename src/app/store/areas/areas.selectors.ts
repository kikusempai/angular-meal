import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AreasState } from './areas.reducer';

export const selectAreasState = createFeatureSelector<AreasState>('areas');

export const selectAllAreas = createSelector(
    selectAreasState,
    (state) => state.areas
);

export const selectSelectedArea = createSelector(
    selectAreasState,
    (state) => state.selectedArea
);

export const selectAreasLoading = createSelector(
    selectAreasState,
    (state) => state.loading
);

export const selectAreasError = createSelector(
    selectAreasState,
    (state) => state.error
);

export const selectAreasLoaded = createSelector(
    selectAreasState,
    (state) => state.areas.length > 0
);

export const selectAreaNames = createSelector(
    selectAllAreas,
    (areas) => areas.map(area => area.strArea)
);
