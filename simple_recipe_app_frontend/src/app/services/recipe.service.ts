import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, debounceTime, map, shareReplay, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/** Recipe model */
export interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  time: string;
  servings: number;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  // Keep search query state across navigation
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable().pipe(
    debounceTime(300),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // Cache fetched recipes
  private recipes$?: Observable<Recipe[]>;

  /** Update the current search query */
  // PUBLIC_INTERFACE
  setSearchQuery(query: string) {
    /** Sets the current search query used to filter the recipes list. */
    this.searchQuerySubject.next(query);
  }

  /** Get the current search query value */
  // PUBLIC_INTERFACE
  getSearchQuerySnapshot(): string {
    /** Returns the current search query value synchronously. */
    return this.searchQuerySubject.getValue();
  }

  /** List recipes, optionally filtered by a query (client-side) */
  // PUBLIC_INTERFACE
  listRecipes(): Observable<Recipe[]> {
    /**
     * Returns an observable of recipe arrays. If environment.apiBaseUrl is not set, it falls back
     * to loading assets/recipes.json bundled with the app.
     */
    if (!this.recipes$) {
      if (environment.apiBaseUrl) {
        // Attempt to load from API
        this.recipes = this.http.get<Recipe[]>(this.joinUrl(environment.apiBaseUrl, '/recipes')).pipe(
          catchError(err => {
            console.warn('API fetch failed, falling back to mock data.', err);
            return this.http.get<Recipe[]>('/assets/recipes.json');
          }),
          map(items => this.normalize(items)),
          shareReplay({ bufferSize: 1, refCount: true })
        );
      } else {
        // Fallback to local mock
        this.recipes = this.http.get<Recipe[]>('/assets/recipes.json').pipe(
          map(items => this.normalize(items)),
          shareReplay({ bufferSize: 1, refCount: true })
        );
      }
      this.recipes$ = this.recipes;
    }
    return this.recipes$;
  }
  private recipes?: Observable<Recipe[]>;

  /** Get a single recipe by ID */
  // PUBLIC_INTERFACE
  getRecipe(id: string): Observable<Recipe> {
    /**
     * Returns an observable of a single recipe. Uses API if configured, otherwise from cached mock list.
     */
    if (environment.apiBaseUrl) {
      return this.http.get<Recipe>(this.joinUrl(environment.apiBaseUrl, `/recipes/${encodeURIComponent(id)}`)).pipe(
        catchError(() =>
          // Fallback to local list if API fails
          this.listRecipes().pipe(
            map(list => {
              const found = list.find(r => r.id === id);
              if (!found) throw new Error('Recipe not found');
              return found;
            })
          )
        )
      );
    }
    // From cached list (mock)
    return this.listRecipes().pipe(
      map(list => {
        const found = list.find(r => r.id === id);
        if (!found) throw new Error('Recipe not found');
        return found;
      })
    );
  }

  /** Stream of filtered recipes based on search query */
  // PUBLIC_INTERFACE
  filteredRecipes$(): Observable<Recipe[]> {
    /** Returns recipes filtered using the debounced search query across title, description, ingredients and tags. */
    return this.searchQuery$.pipe(
      switchMap(query =>
        this.listRecipes().pipe(
          map(recipes => this.filter(recipes, query))
        )
      )
    );
  }

  private filter(recipes: Recipe[], query: string): Recipe[] {
    const q = (query || '').trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter(r => {
      const hay = [
        r.title,
        r.description,
        r.ingredients.join(' '),
        r.tags.join(' ')
      ].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  private normalize(items: Recipe[]): Recipe[] {
    // Ensure required fields exist and coerce types as needed.
    return (items || []).map(it => ({
      ...it,
      id: String(it.id),
      title: it.title?.trim() || 'Untitled',
      description: it.description?.trim() || '',
      image: it.image || '',
      ingredients: it.ingredients || [],
      steps: it.steps || [],
      tags: it.tags || [],
      time: it.time || '',
      servings: Number(it.servings ?? 0)
    }));
  }

  private joinUrl(base: string, path: string): string {
    if (!base) return path;
    const b = base.endsWith('/') ? base.slice(0, -1) : base;
    const p = path.startsWith('/') ? path : `/${path}`;
    return `${b}${p}`;
  }
}
