import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../services/recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() select = new EventEmitter<Recipe>();

  // PUBLIC_INTERFACE
  onSelect() {
    /** Emits when a card is selected. */
    this.select.emit(this.recipe);
  }

  trackTag(index: number, tag: string) { return tag; }
}
