import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meal } from '../services/meal.service';

@Component({
  selector: 'app-preview-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './preview-recipe.component.html',
  styleUrl: './preview-recipe.component.css'
})
export class PreviewRecipeComponent {
  @Input() meal: Meal;

  constructor() {
    this.meal = {} as Meal;
  }
}
