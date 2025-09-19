import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Ingredient, Area, Category } from '../../services/meal.service';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as CategoriesActions from '../../store/categories/categories.actions';
import * as CategoriesSelectors from '../../store/categories/categories.selectors';
import * as RecipesActions from '../../store/recipes/recipes.actions';
import * as RecipesSelectors from '../../store/recipes/recipes.selectors';
import * as AreasActions from '../../store/areas/areas.actions';
import * as AreasSelectors from '../../store/areas/areas.selectors';
import * as IngredientsActions from '../../store/ingredients/ingredients.actions';
import * as IngredientsSelectors from '../../store/ingredients/ingredients.selectors';
import { GridRecipeComponent } from '../../components/grid-recipe/grid-recipe.component';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { startWith, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    GridRecipeComponent,
    MatAutocomplete,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  ingredientControl = new FormControl('');
  areaControl = new FormControl('');
  categoryControl = new FormControl('');
  searchQuery: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  filteredIngredients: Observable<Ingredient[]> = of([]);
  filteredAreas: Observable<Area[]> = of([]);
  filteredCategories: Observable<Category[]> = of([]);

  // Selectors observables
  categories$ = this.store.select(CategoriesSelectors.selectAllCategories);
  categoriesLoading$ = this.store.select(
    CategoriesSelectors.selectCategoriesLoading
  );
  categoriesError$ = this.store.select(
    CategoriesSelectors.selectCategoriesError
  );

  areas$ = this.store.select(AreasSelectors.selectAllAreas);
  areasLoading$ = this.store.select(AreasSelectors.selectAreasLoading);
  areasError$ = this.store.select(AreasSelectors.selectAreasError);

  ingredients$ = this.store.select(IngredientsSelectors.selectAllIngredients);
  ingredientsLoading$ = this.store.select(
    IngredientsSelectors.selectIngredientsLoading
  );
  ingredientsError$ = this.store.select(
    IngredientsSelectors.selectIngredientsError
  );

  // Recipes observables
  recipes$ = this.store.select(RecipesSelectors.selectAllRecipes);
  recipesLoading$ = this.store.select(RecipesSelectors.selectRecipesLoading);
  recipesError$ = this.store.select(RecipesSelectors.selectRecipesError);

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.filteredIngredients = this.ingredientControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.ingredients$.pipe(
          map((ingredients) =>
            this._filter(value || '', ingredients, 'strIngredient')
          )
        )
      )
    );
    this.filteredAreas = this.areaControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.areas$.pipe(
          map((areas) => this._filter(value || '', areas, 'strArea'))
        )
      )
    );
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.categories$.pipe(
          map((categories) =>
            this._filter(value || '', categories, 'strCategory')
          )
        )
      )
    );
    this.store.dispatch(CategoriesActions.loadCategories());
    this.store.dispatch(AreasActions.loadAreas());
    this.store.dispatch(IngredientsActions.loadIngredients());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // -------- Event handlers --------
  onSearch(): void {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      this.store.dispatch(
        RecipesActions.loadRecipes({ searchQuery: this.searchQuery.trim() })
      );
      this.categoryControl.setValue('');
      this.areaControl.setValue('');
      this.ingredientControl.setValue('');
    }
  }

  onAreaSelected($event: MatAutocompleteSelectedEvent): void {
    this.store.dispatch(AreasActions.selectArea({ area: $event.option.value }));
    this.store.dispatch(
      RecipesActions.loadRecipes({ area: $event.option.value })
    );
    this.categoryControl.setValue('');
    this.ingredientControl.setValue('');
  }

  onCategorySelected($event: MatAutocompleteSelectedEvent): void {
    this.store.dispatch(
      CategoriesActions.selectCategory({ category: $event.option.value })
    );
    this.store.dispatch(
      RecipesActions.loadRecipes({ category: $event.option.value })
    );
    this.areaControl.setValue('');
    this.ingredientControl.setValue('');
  }

  onIngredientSelected($event: MatAutocompleteSelectedEvent): void {
    this.store.dispatch(
      IngredientsActions.selectIngredient({ ingredient: $event.option.value })
    );
    this.store.dispatch(
      RecipesActions.loadRecipes({ ingredient: $event.option.value })
    );
    this.categoryControl.setValue('');
    this.areaControl.setValue('');
  }

  // -------- Misc --------
  private _filter<T extends { [key: string]: any }>(
    value: string,
    superSet: T[],
    key: keyof T
  ): T[] {
    const filterValue = value.toLowerCase();
    return superSet.filter((item) =>
      String(item[key]).toLowerCase().includes(filterValue)
    );
  }

  selectCategory(category: string): void {
    this.store.dispatch(CategoriesActions.selectCategory({ category }));
  }

  selectArea(area: string): void {
    this.store.dispatch(AreasActions.selectArea({ area }));
  }

  selectIngredient(ingredient: string): void {
    this.store.dispatch(IngredientsActions.selectIngredient({ ingredient }));
  }

  trackByCategoryFn(index: number, item: Category): string {
    return item.strCategory;
  }

  trackByAreaFn(index: number, item: any): string {
    return item.strArea;
  }

  trackByIngredientFn(index: number, item: any): string {
    return item.strIngredient;
  }
}
