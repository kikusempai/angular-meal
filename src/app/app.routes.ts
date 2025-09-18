import { Routes } from '@angular/router';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'view/:id', component: ViewRecipeComponent }
];
