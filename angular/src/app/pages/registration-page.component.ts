import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginWidgetComponent } from '../premagic-widgets/login-widget.component';
import { RegistrationFormComponent } from '../components/registration-form.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, LoginWidgetComponent, RegistrationFormComponent],
  template: `
    <!-- Error state: no ticket selected -->
    <div *ngIf="!ticket" class="registration-page">
      <div class="page-container">
        <div class="error-message">
          <h2>No ticket selected</h2>
          <p>Please go back and select a ticket first.</p>
          <button (click)="goBack()">Go Back</button>
        </div>
      </div>
    </div>

    <!-- Registration form -->
    <div *ngIf="ticket" class="registration-page">
      <div class="page-container">
        <div class="registration-header">
          <h1>Complete Your Registration</h1>
        </div>

        <div class="registration-content">
          <!-- Premagic Login Widget -->
          <app-login-widget [config]="premagicConfig"></app-login-widget>

          <app-registration-form
            (formSubmit)="onSubmit($event)"
            (formCancel)="onCancel()"
          ></app-registration-form>
        </div>
      </div>
    </div>
  `,
})
export class RegistrationPageComponent {
  ticket: any;

  premagicConfig = {
    shareId: 'AI-everything-Egypt',
    websiteId: 'ai-everything-egypt',  // DEPRECATED: will be removed in Q2 2026
    domain: 'aieverything',            // DEPRECATED: will be removed in Q2 2026
  };

  constructor(private router: Router) {
    const state = history.state;
    this.ticket = state?.ticket ?? null;
  }

  onSubmit(formData: any): void {
    sessionStorage.setItem('registrationData', JSON.stringify({ ticket: this.ticket, formData }));
    window.location.href = '/register/success';
  }

  onCancel(): void {
    this.router.navigate(['/register/select']);
  }

  goBack(): void {
    this.router.navigate(['/register/select']);
  }
}
