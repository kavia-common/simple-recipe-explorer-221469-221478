import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../services/recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-grid',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './recipe-grid.component.html',
  styleUrl: './recipe-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeGridComponent {
  @Input() recipes: Recipe[] = [];

  trackById(index: number, item: Recipe) {
    return item.id;
  }
}
