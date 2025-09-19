import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AppState } from '../../store';
import * as CategoriesActions from '../../store/categories/categories.actions';
import * as CategoriesSelectors from '../../store/categories/categories.selectors';
import * as RecipesActions from '../../store/recipes/recipes.actions';
import * as RecipesSelectors from '../../store/recipes/recipes.selectors';
import { Category, Meal } from '../../services/meal.service';
import { GridRecipeComponent } from '../../components/grid-recipe/grid-recipe.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, GridRecipeComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  selectedCategory$: Observable<string | null>;
  categoriesLoading$: Observable<boolean>;
  categoriesError$: Observable<string | null>;

  recipes$: Observable<Meal[]>;
  recipesLoading$: Observable<boolean>;
  recipesError$: Observable<string | null>;
  currentCategory$: Observable<string | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.store.select(CategoriesSelectors.selectAllCategories);
    this.selectedCategory$ = this.store.select(CategoriesSelectors.selectSelectedCategory);
    this.categoriesLoading$ = this.store.select(CategoriesSelectors.selectCategoriesLoading);
    this.categoriesError$ = this.store.select(CategoriesSelectors.selectCategoriesError);

    this.recipes$ = this.store.select(RecipesSelectors.selectAllRecipes);
    this.recipesLoading$ = this.store.select(RecipesSelectors.selectRecipesLoading);
    this.recipesError$ = this.store.select(RecipesSelectors.selectRecipesError);
    this.currentCategory$ = this.store.select(RecipesSelectors.selectCurrentCategory);
  }

  ngOnInit(): void {
    // Load categories when component initializes
    this.store.dispatch(CategoriesActions.loadCategories());

    // Load recipes for the specific category from route params
    this.route.params.pipe(
      switchMap(params => {
        const categoryName = params['name'];
        if (categoryName) {
          this.store.dispatch(RecipesActions.loadRecipes({ category: categoryName }));
        }
        return of(categoryName);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}