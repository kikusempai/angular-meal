import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { MealService, Meal } from '../services/meal.service';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit {
  meal$: Observable<Meal | null> = of(null);
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService
  ) { }

  ngOnInit(): void {
    this.meal$ = this.route.params.pipe(
      switchMap(params => {
        const mealId = params['id'];
        if (!mealId) {
          this.errorMessage = 'No meal ID provided';
          return of(null);
        }

        // For now, we'll need to implement a method to get meal by ID
        // Since TheMealDB API doesn't have a direct "get by ID" endpoint,
        // we'll need to use the lookup endpoint
        return this.mealService.getMealById(mealId).pipe(
          catchError(error => {
            this.errorMessage = 'Failed to load meal details';
            console.error('Error loading meal:', error);
            return of(null);
          })
        );
      })
    );
  }
}
