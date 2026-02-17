import { Routes } from '@angular/router';
import { EventPageComponent } from './pages/event-page.component';
import { RegistrationPageComponent } from './pages/registration-page.component';
import { SuccessPageComponent } from './pages/success-page.component';

export const routes: Routes = [
  { path: '', component: EventPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'success', component: SuccessPageComponent },
];
