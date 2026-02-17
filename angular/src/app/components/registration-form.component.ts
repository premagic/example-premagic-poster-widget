import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="registration-form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            formControlName="firstName"
            required
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            formControlName="lastName"
            required
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="emailId">Email Address *</label>
          <input
            type="email"
            id="emailId"
            formControlName="emailId"
            required
          />
        </div>

        <div class="form-group">
          <label for="emailIdConfirmation">Confirm Email Address *</label>
          <input
            type="email"
            id="emailIdConfirmation"
            formControlName="emailIdConfirmation"
            required
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            formControlName="companyName"
          />
        </div>

        <div class="form-group">
          <label for="jobTitle">Job Title / Role</label>
          <input
            type="text"
            id="jobTitle"
            formControlName="jobTitle"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="linkedinProfile">LinkedIn Profile URL</label>
        <input
          type="url"
          id="linkedinProfile"
          formControlName="linkedinProfile"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" (click)="onCancel()">
          Cancel
        </button>
        <button type="submit" class="btn-primary">
          Next
        </button>
      </div>
    </form>
  `,
})
export class RegistrationFormComponent {
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      emailIdConfirmation: ['', [Validators.required, Validators.email]],
      companyName: [''],
      jobTitle: [''],
      linkedinProfile: [''],
    });
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
