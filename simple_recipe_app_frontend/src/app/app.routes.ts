import { Routes } from '@angular/router';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

export const routes: Routes = [
  { path: '', component: RecipeListPageComponent, title: 'Recipes • Simple Recipe App' },
  { path: 'recipe/:id', component: RecipeDetailComponent, title: 'Recipe Details • Simple Recipe App' },
  { path: '**', redirectTo: '' }
];
