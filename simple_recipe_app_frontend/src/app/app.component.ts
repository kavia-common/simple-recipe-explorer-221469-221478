import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Simple Recipe App';
  private router = inject(Router);

  constructor() {
    // Accessibility: announce route changes if desired in future
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        // no-op for now
      }
    });
  }
}
