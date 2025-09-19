import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

export interface Category {
  strCategory: string;
}

export interface Area {
  strArea: string;
}

export interface Ingredient {
  strIngredient: string;
}

export interface CategoryResponse {
  meals: Category[] | null;
}

export interface AreaResponse {
  meals: Area[] | null;
}

export interface IngredientResponse {
  meals: Ingredient[] | null;
}

export interface MealResponse {
  meals: Meal[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  private readonly parameterOptions = ['c', 'a', 'i'];

  constructor(private http: HttpClient) {}

  listCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}/list.php?c=list`;

    return this.http.get<CategoryResponse>(url).pipe(
      map((response) => response.meals || []),
      catchError((error) => {
        console.error('Error listing categories:', error);
        return throwError(
          () => new Error('Something went wrong, please try again later')
        );
      })
    );
  }

  listAreas(): Observable<Area[]> {
    const url = `${this.baseUrl}/list.php?a=list`;

    return this.http.get<AreaResponse>(url).pipe(
      map((response) => response.meals || []),
      catchError((error) => {
        console.error('Error listing areas:', error);
        return throwError(
          () => new Error('Something went wrong, please try again later')
        );
      })
    );
  }

  listIngredients(): Observable<Ingredient[]> {
    const url = `${this.baseUrl}/list.php?i=list`;

    return this.http.get<IngredientResponse>(url).pipe(
      map((response) => response.meals || []),
      catchError((error) => {
        console.error('Error listing ingredients:', error);
        return throwError(
          () => new Error('Something went wrong, please try again later')
        );
      })
    );
  }

  searchMeals(query: string): Observable<Meal[]> {
    if (!query || query.trim().length === 0) {
      return throwError(() => new Error('Search query cannot be empty'));
    }

    const url = `${this.baseUrl}/search.php?s=${encodeURIComponent(
      query.trim()
    )}`;

    return this.http.get<MealResponse>(url).pipe(
      map((response) => response.meals || []),
      catchError((error) => {
        console.error('Error searching meals:', error);
        return throwError(
          () => new Error('Something went wrong, please try again later')
        );
      })
    );
  }

  getMealById(id: string): Observable<Meal> {
    if (!id || id.trim().length === 0) {
      return throwError(() => new Error('Meal ID cannot be empty'));
    }

    const url = `${this.baseUrl}/lookup.php?i=${encodeURIComponent(id.trim())}`;

    return this.http.get<MealResponse>(url).pipe(
      map((response) => {
        if (!response.meals || response.meals.length === 0) {
          throw new Error('Meal not found');
        }
        return response.meals[0];
      }),
      catchError((error) => {
        console.error('Error fetching meal by ID:', error);
        return throwError(
          () =>
            new Error('Failed to fetch meal details. Please try again later')
        );
      })
    );
  }

  filterByCategory(query: string): Observable<Meal[]> {
    if (!query || query.trim().length === 0) {
      return throwError(() => new Error('Category cannot be empty'));
    }

    const url = `${this.baseUrl}/filter.php?c=${encodeURIComponent(query)}`;

    return this.http.get<MealResponse>(url).pipe(
      map((response) => response.meals || []),
      catchError((error) => {
        console.error('Error filtering by category:', error);
        return throwError(
          () => new Error('Something went wrong, please try again later')
        );
      })
    );
  }
}
