<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tickets = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: 299,
    currency: 'EGP',
    description:
      'Get in early and save! Includes access to all keynote sessions and networking events.',
    available: true,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 499,
    currency: 'EGP',
    description:
      'Full conference access including workshops, keynotes, and networking lunch.',
    available: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 999,
    currency: 'EGP',
    description:
      'Premium experience with front-row seating, exclusive meet & greet, and after-party access.',
    available: true,
  },
]

const selectedTicket = ref(null)

function selectTicket(ticket) {
  if (!ticket.available) return
  selectedTicket.value = ticket
}

function handleBuyTicket() {
  if (!selectedTicket.value) return
  router.push({
    path: '/register/form',
    state: { ticket: JSON.parse(JSON.stringify(selectedTicket.value)) },
  })
}
</script>

<template>
  <div class="event-page">
    <div class="page-container">
      <div class="event-header">
        <h1 class="event-title">AI Everything Egypt</h1>
        <div class="event-meta">
          <span>📅 March 15, 2024</span>
          <span>🕐 9:00 AM - 6:00 PM</span>
          <span>📍 Cairo Convention Center, Egypt</span>
        </div>
      </div>

      <div class="event-content">
        <div class="event-description">
          <h2>About the Event</h2>
          <p>
            Join us at AI Everything Egypt, the premier artificial intelligence
            conference in the MENA region. Explore the latest trends in AI,
            machine learning, and digital transformation with industry leaders
            and innovators from around the world.
          </p>
        </div>

        <div class="tickets-section">
          <h2>Select Your Ticket</h2>
          <div class="tickets-grid">
            <div
              v-for="ticket in tickets"
              :key="ticket.id"
              class="ticket-card"
              :class="{
                selected: selectedTicket?.id === ticket.id,
                unavailable: !ticket.available,
              }"
              @click="selectTicket(ticket)"
            >
              <span v-if="!ticket.available" class="ticket-unavailable">
                Sold Out
              </span>
              <h3 class="ticket-name">{{ ticket.name }}</h3>
              <div class="ticket-price">
                <span class="price-amount">{{ ticket.price }}</span>
                <span class="price-currency">{{ ticket.currency }}</span>
              </div>
              <p class="ticket-description">{{ ticket.description }}</p>
            </div>
          </div>

          <button
            class="buy-button"
            :disabled="!selectedTicket"
            @click="handleBuyTicket"
          >
            {{
              selectedTicket
                ? `Buy ${selectedTicket.name} Ticket - ${selectedTicket.price} ${selectedTicket.currency}`
                : 'Select a ticket to continue'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
