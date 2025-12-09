import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeGridComponent } from '../../components/recipe-grid/recipe-grid.component';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { catchError, map, of } from 'rxjs';

type ListVm = { recipes: Recipe[]; error: boolean };

@Component({
  selector: 'app-recipe-list-page',
  standalone: true,
  imports: [CommonModule, RecipeGridComponent],
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListPageComponent {
  private service = inject(RecipeService);

  vm$ = this.service.filteredRecipes$().pipe(
    map((recipes): ListVm => ({ recipes, error: false })),
    catchError(err => {
      console.error(err);
      return of({ recipes: [], error: true } as ListVm);
    })
  );

  // PUBLIC_INTERFACE
  track(index: number, item: any) { return index; }
}
