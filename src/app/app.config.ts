import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { reducers } from './store';
import { CategoriesEffects } from './store/categories/categories.effects';
import { RecipesEffects } from './store/recipes/recipes.effects';
import { AreasEffects } from './store/areas/areas.effects';
import { IngredientsEffects } from './store/ingredients/ingredients.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore(reducers),
    provideEffects([CategoriesEffects, RecipesEffects, AreasEffects, IngredientsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};
