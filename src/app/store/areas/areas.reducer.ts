import { createReducer, on } from '@ngrx/store';
import { Area } from '../../services/meal.service';
import * as AreasActions from './areas.actions';

export interface AreasState {
    areas: Area[];
    selectedArea: string | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AreasState = {
    areas: [],
    selectedArea: null,
    loading: false,
    error: null,
};

export const areasReducer = createReducer(
    initialState,

    // Load Areas
    on(AreasActions.loadAreas, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(AreasActions.loadAreasSuccess, (state, { areas }) => ({
        ...state,
        areas,
        loading: false,
        error: null,
    })),

    on(AreasActions.loadAreasFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Select Area
    on(AreasActions.selectArea, (state, { area }) => ({
        ...state,
        selectedArea: area,
    })),

    // Clear Selection
    on(AreasActions.clearAreaSelection, (state) => ({
        ...state,
        selectedArea: null,
    }))
);
