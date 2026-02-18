import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-container">
      <header class="main-header">
        <div class="main-header-inner">
          <a routerLink="/register/select" class="main-header-brand">Premagic Demo</a>
          <nav class="main-header-nav">
            <a routerLink="/register/select" routerLinkActive="active" class="main-header-nav-item">
              <span class="main-header-nav-label">Registration</span>
              <span class="main-header-nav-note">LoginWidget + form autofill</span>
            </a>
            <a routerLink="/profile" routerLinkActive="active" class="main-header-nav-item">
              <span class="main-header-nav-label">Profile</span>
              <span class="main-header-nav-note">PosterWidget with prefillData</span>
            </a>
          </nav>
        </div>
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
