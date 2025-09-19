import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MealService, Meal, Category } from '../../services/meal.service';
import { PreviewRecipeComponent } from '../../components/preview-recipe/preview-recipe.component';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, PreviewRecipeComponent, MatList, MatListItem, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: Meal[] = [];
  categoriesResults: Category[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();
  private categoriesSubject$ = new Subject<string>();

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.trim().length === 0) {
          return [];
        }
        this.isLoading = true;
        this.errorMessage = '';
        return this.mealService.searchMeals(query);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
        if (results.length === 0) {
          this.errorMessage = 'No meals found for your search.';
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred while searching.';
        this.isLoading = false;
        this.searchResults = [];
      }
    });

    this.categoriesSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        return this.mealService.listCategories();
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (results) => {
        this.categoriesResults = results;
        this.isLoading = false;
        if (results.length === 0) {
          this.errorMessage = 'No categories available';
        }
      },
      error: (error) => {
        this.errorMessage = error.message || 'An error occurred.';
        this.isLoading = false;
        this.categoriesResults = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(): void {
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      this.searchSubject$.next(this.searchQuery.trim());
    }
  }
}
