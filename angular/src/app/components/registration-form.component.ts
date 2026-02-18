import { Component, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
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
            name="firstName"
            formControlName="firstName"
            required
          />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
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
            name="emailId"
            formControlName="emailId"
            required
          />
        </div>

        <div class="form-group">
          <label for="emailIdConfirmation">Confirm Email Address *</label>
          <input
            type="email"
            id="emailIdConfirmation"
            name="emailIdConfirmation"
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
            name="companyName"
            formControlName="companyName"
          />
        </div>

        <div class="form-group">
          <label for="jobTitle">Job Title / Role</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            formControlName="jobTitle"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="linkedinProfile">LinkedIn Profile URL</label>
        <input
          type="url"
          id="linkedinProfile"
          name="linkedinProfile"
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
export class RegistrationFormComponent implements AfterViewInit, OnDestroy {
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  form: FormGroup;
  private autofillPollInterval: ReturnType<typeof setInterval> | null = null;

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

  /**
   * EXTERNAL AUTOFILL SYNC
   *
   * The Premagic LoginWidget autofills form fields by setting DOM input .value
   * directly. Angular Reactive Forms do NOT detect DOM-level value changes --
   * only changes through the FormControl API or user-dispatched input events.
   *
   * This polling mechanism checks every 500ms if any DOM input value differs
   * from its FormControl value and syncs them. It stops once all required
   * fields are filled (autofill is complete) or on component destroy.
   */
  ngAfterViewInit(): void {
    this.autofillPollInterval = setInterval(() => {
      this.syncDomValuesToForm();
    }, 500);
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private syncDomValuesToForm(): void {
    const controls = this.form.controls;
    let changed = false;

    Object.keys(controls).forEach((key) => {
      const input = document.getElementById(key) as HTMLInputElement | null;
      if (input && input.value !== controls[key].value) {
        controls[key].setValue(input.value, { emitEvent: false });
        changed = true;
      }
    });

    if (changed) {
      this.form.updateValueAndValidity();
    }

    // Stop polling once all required fields have been filled
    const { firstName, lastName, emailId } = this.form.controls;
    if (firstName.value && lastName.value && emailId.value) {
      this.stopPolling();
    }
  }

  private stopPolling(): void {
    if (this.autofillPollInterval) {
      clearInterval(this.autofillPollInterval);
      this.autofillPollInterval = null;
    }
  }

  onSubmit(): void {
    // Final sync before submit in case the poll hasn't caught the latest values
    this.syncDomValuesToForm();
    this.formSubmit.emit(this.form.value);
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
