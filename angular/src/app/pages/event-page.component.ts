import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Ticket {
  id: number;
  name: string;
  price: number;
  currency: string;
  description: string;
  available: boolean;
}

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-page">
      <div class="page-container">
        <div class="event-header">
          <h1 class="event-title">{{ eventInfo.title }}</h1>
          <div class="event-meta">
            <span class="event-date">📅 {{ eventInfo.date }}</span>
            <span class="event-time">🕐 {{ eventInfo.time }}</span>
            <span class="event-location">📍 {{ eventInfo.location }}</span>
          </div>
        </div>

        <div class="event-content">
          <div class="event-description">
            <h2>About the Event</h2>
            <p>{{ eventInfo.description }}</p>
          </div>

          <div class="tickets-section">
            <h2>Select Your Ticket</h2>
            <div class="tickets-grid">
              <div
                *ngFor="let ticket of tickets"
                class="ticket-card"
                [class.selected]="selectedTicket?.id === ticket.id"
                [class.unavailable]="!ticket.available"
                (click)="ticket.available && selectTicket(ticket)"
              >
                <h3 class="ticket-name">{{ ticket.name }}</h3>
                <div class="ticket-price">
                  <span class="price-amount">{{ ticket.price }}</span>
                  <span class="price-currency">{{ ticket.currency }}</span>
                </div>
                <p class="ticket-description">{{ ticket.description }}</p>
                <div *ngIf="!ticket.available" class="ticket-unavailable">Sold Out</div>
              </div>
            </div>

            <button
              class="buy-button"
              (click)="buyTicket()"
              [disabled]="!selectedTicket"
            >
              {{ selectedTicket ? 'Buy ' + selectedTicket.name + ' Ticket' : 'Select a Ticket' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EventPageComponent {
  selectedTicket: Ticket | null = null;

  eventInfo = {
    title: 'AI Everything Egypt',
    date: 'March 15, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Cairo Convention Center, Egypt',
    description:
      'Join us for an exciting conference on Artificial Intelligence and its applications. Network with industry leaders, attend insightful sessions, and explore the future of AI.',
  };

  tickets: Ticket[] = [
    {
      id: 1,
      name: 'Early Bird',
      price: 299,
      currency: 'EGP',
      description: 'Limited availability. Includes access to all sessions and networking events.',
      available: true,
    },
    {
      id: 2,
      name: 'Standard',
      price: 499,
      currency: 'EGP',
      description: 'Full access to all sessions, networking events, and lunch.',
      available: true,
    },
    {
      id: 3,
      name: 'VIP',
      price: 999,
      currency: 'EGP',
      description: 'VIP access with premium seating, exclusive networking dinner, and meet & greet with speakers.',
      available: true,
    },
  ];

  constructor(private router: Router) {}

  selectTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  buyTicket(): void {
    if (this.selectedTicket) {
      this.router.navigate(['/register'], { state: { ticket: this.selectedTicket } });
    }
  }
}
