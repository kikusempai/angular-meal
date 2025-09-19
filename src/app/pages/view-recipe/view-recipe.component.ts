import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as RecipesActions from '../../store/recipes/recipes.actions';
import * as RecipesSelectors from '../../store/recipes/recipes.selectors';
import { Meal } from '../../services/meal.service';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss'
})
export class ViewRecipeComponent implements OnInit {
  meal$: Observable<Meal | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.meal$ = this.store.select(RecipesSelectors.selectCurrentRecipe);
    this.loading$ = this.store.select(RecipesSelectors.selectRecipeLoading);
    this.error$ = this.store.select(RecipesSelectors.selectRecipeError);
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const mealId = params['id'];
        if (!mealId) {
          return of(null);
        }

        this.store.dispatch(RecipesActions.loadRecipeById({ id: mealId }));
        return of(mealId);
      })
    ).subscribe();
  }
}
