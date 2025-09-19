import { Routes } from '@angular/router';
import { ViewRecipeComponent } from './pages/view-recipe/view-recipe.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'Home' },
    },
    {
        path: 'view/:id',
        component: ViewRecipeComponent,
        data: { breadcrumb: 'Recipe Details' },
    },
];
