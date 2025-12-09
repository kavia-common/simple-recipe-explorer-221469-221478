import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  query = this.recipeService.getSearchQuerySnapshot();

  // PUBLIC_INTERFACE
  onSearchChange(value: string) {
    /** Update global search query and ensure we're on the list page. */
    this.recipeService.setSearchQuery(value);
    if (this.router.url.startsWith('/recipe/')) {
      this.router.navigateByUrl('/');
    }
  }
}
