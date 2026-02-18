import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PosterWidgetComponent } from '../premagic-widgets/poster-widget.component';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [CommonModule, PosterWidgetComponent],
  template: `
    <!-- Error state: no registration data -->
    <div *ngIf="!ticket || !formData" class="success-page">
      <div class="page-container">
        <div class="error-message">
          <h2>Invalid registration</h2>
          <p>Please complete the registration form first.</p>
          <button (click)="goToEventPage()">Go to Event Page</button>
        </div>
      </div>
    </div>

    <!-- Success content -->
    <div *ngIf="ticket && formData" class="success-page">
      <div class="page-container">
        <div class="success-content">
          <div class="success-header">
            <div class="success-icon">✓</div>
            <h1>Registration Successful!</h1>
            <p class="success-message">
              Thank you, {{ formData.firstName || 'there' }}! Your registration for
              <strong>{{ ticket.name }} Ticket</strong> has been confirmed.
            </p>
          </div>

          <!-- Premagic Poster Creator Widget -->
          <app-poster-widget [config]="premagicConfig"></app-poster-widget>

          <div class="success-actions">
            <button class="btn-primary" (click)="goToEventPage()">
              Back to Event Page
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SuccessPageComponent implements OnInit {
  ticket: any;
  formData: any;

  premagicConfig = {
    shareId: 'AI-everything-Egypt',
    websiteId: 'ai-everything-egypt',  // DEPRECATED: will be removed in Q2 2026
    domain: 'aieverything',            // DEPRECATED: will be removed in Q2 2026
  };

  constructor(private router: Router) {
    const state = history.state;
    if (state?.ticket) {
      this.ticket = state.ticket;
      this.formData = state.formData;
    }
  }

  ngOnInit(): void {
    /**
     * DATA RETRIEVAL FOR HARD NAVIGATION
     *
     * This component supports both soft navigation (Angular Router state) and
     * hard navigation (full page reload via sessionStorage).
     *
     * How it works:
     * 1. First tries to get data from router state (soft navigation)
     * 2. Falls back to sessionStorage (hard navigation - full page reload)
     * 3. Cleans up sessionStorage after reading to prevent stale data
     */
    if (!this.ticket) {
      try {
        const stored = sessionStorage.getItem('registrationData');
        if (stored) {
          const parsed = JSON.parse(stored);
          this.ticket = parsed.ticket;
          this.formData = parsed.formData;
        }
      } catch (e) {
        // Ignore parse errors
      }
    }

    // Clean up sessionStorage after reading
    if (sessionStorage.getItem('registrationData')) {
      sessionStorage.removeItem('registrationData');
    }
  }

  goToEventPage(): void {
    this.router.navigate(['/register/select']);
  }
}
