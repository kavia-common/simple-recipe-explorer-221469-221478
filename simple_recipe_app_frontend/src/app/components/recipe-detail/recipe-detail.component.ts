import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(RecipeService);
  private router = inject(Router);

  vm$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id') ?? '';
      return this.service.getRecipe(id);
    }),
    catchError(err => {
      console.error(err);
      return of(null as unknown as Recipe);
    })
  );

  // PUBLIC_INTERFACE
  backToList() {
    /** Navigate back to the list, preserving search state. */
    this.router.navigateByUrl('/');
  }

  track(index: number, item: string) { return index + '-' + item; }
}
