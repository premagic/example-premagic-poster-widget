import { Routes } from '@angular/router';
import { EventPageComponent } from './pages/event-page.component';
import { RegistrationPageComponent } from './pages/registration-page.component';
import { SuccessPageComponent } from './pages/success-page.component';
import { ProfilePageComponent } from './pages/profile-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register/select', pathMatch: 'full' },
  { path: 'register/select', component: EventPageComponent },
  { path: 'register/form', component: RegistrationPageComponent },
  { path: 'register/success', component: SuccessPageComponent },
  { path: 'profile', component: ProfilePageComponent },
];
