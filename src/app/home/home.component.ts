import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MealService, Meal } from '../services/meal.service';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { PreviewRecipeComponent } from '../preview-recipe/preview-recipe.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatTabGroup, MatTab, PreviewRecipeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: Meal[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();

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

  onInputChange(): void {
    // Optional: Implement real-time search as user types
    // this.searchSubject$.next(this.searchQuery.trim());
  }
}
