import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PosterWidgetComponent } from '../premagic-widgets/poster-widget.component';

/**
 * ATTENDEE PROFILE PAGE
 *
 * Demonstrates the PosterWidget with prefillData -- used when you already
 * have user information from your own authentication/database and do NOT
 * need the LoginWidget (LinkedIn login).
 *
 * The prefillData object pre-populates the poster with attendee details.
 */
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, PosterWidgetComponent],
  template: `
    <div class="success-page">
      <div class="page-container">
        <div class="success-content">
          <div class="success-header">
            <div class="profile-avatar">
              <img
                [src]="attendee.userPhoto"
                [alt]="attendee.userName"
                style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid #667eea;"
              />
            </div>
            <h1>{{ attendee.userName }}</h1>
            <p class="success-message">
              {{ attendee.userTitle }} at <strong>{{ attendee.userCompany }}</strong>
            </p>
            <p style="color: #888; font-size: 0.9rem; margin-top: 0.5rem;">
              {{ attendee.sessionTitle }} &middot; Registration #{{ attendee.registrationId }}
            </p>
          </div>

          <div style="margin: 2rem 0;">
            <h3 style="text-align: center; margin-bottom: 0.5rem; color: #333;">
              Create Your Event Poster
            </h3>
            <p style="text-align: center; color: #666; margin-bottom: 1.5rem;">
              Your profile info is already filled in. Personalize and share your poster!
            </p>
            <app-poster-widget [config]="premagicConfig"></app-poster-widget>
          </div>

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
export class ProfilePageComponent {
  // Simulated attendee data -- in a real app this would come from
  // your auth system, database, or API
  attendee = {
    externalId: 'ext_12345',
    userName: 'John Doe',
    userTitle: 'Senior Developer',
    userCompany: 'Acme Corp',
    userPhoto: 'https://i.pravatar.cc/200?img=12',
    email: 'john@example.com',
    phone: '+1234567890',
    registrationId: 'reg_67890',
    sessionTitle: 'AI Everything Egypt 2025',
  };

  // Premagic configuration with prefillData
  premagicConfig = {
    shareId: 'AI-everything-Egypt',
    websiteId: 'ai-everything-egypt',  // DEPRECATED: will be removed in Q2 2026
    domain: 'aieverything',            // DEPRECATED: will be removed in Q2 2026
    prefillData: {
      externalId: this.attendee.externalId,
      userName: this.attendee.userName,
      userTitle: this.attendee.userTitle,
      userCompany: this.attendee.userCompany,
      userPhoto: this.attendee.userPhoto,
      email: this.attendee.email,
      phone: this.attendee.phone,
      registrationId: this.attendee.registrationId,
      sessionTitle: this.attendee.sessionTitle,
    },
  };

  constructor(private router: Router) {}

  goToEventPage(): void {
    this.router.navigate(['/']);
  }
}
