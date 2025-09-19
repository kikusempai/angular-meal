import { Component } from '@angular/core';
import { PreviewRecipeComponent } from '../preview-recipe/preview-recipe.component';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Meal } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import * as RecipesSelectors from '../../store/recipes/recipes.selectors';

@Component({
  selector: 'app-grid-recipe',
  standalone: true,
  imports: [PreviewRecipeComponent, CommonModule],
  templateUrl: './grid-recipe.component.html',
  styleUrl: './grid-recipe.component.scss'
})
export class GridRecipeComponent {

  recipes$: Observable<Meal[]>;
  recipesLoading$: Observable<boolean>;
  recipesError$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.recipes$ = this.store.select(RecipesSelectors.selectAllRecipes);
    this.recipesLoading$ = this.store.select(RecipesSelectors.selectRecipesLoading);
    this.recipesError$ = this.store.select(RecipesSelectors.selectRecipesError);
  }

}
