<script setup>
import { useRouter } from 'vue-router'
import PosterWidget from '../premagic-widgets/PosterWidget.vue'

/**
 * ATTENDEE PROFILE PAGE
 *
 * Demonstrates the PosterWidget with prefillData -- used when you already
 * have user information from your own authentication/database and do NOT
 * need the LoginWidget (LinkedIn login).
 *
 * The prefillData object pre-populates the poster with attendee details.
 */

const router = useRouter()

// Simulated attendee data -- in a real app this would come from
// your auth system, database, or API
const attendee = {
  externalId: 'ext_12345',
  userName: 'John Doe',
  userTitle: 'Senior Developer',
  userCompany: 'Acme Corp',
  userPhoto: 'https://i.pravatar.cc/200?img=12',
  email: 'john@example.com',
  phone: '+1234567890',
  registrationId: 'reg_67890',
  sessionTitle: 'AI Everything Egypt 2025',
}

// Premagic configuration with prefillData
const premagicConfig = {
  shareId: 'AI-everything-Egypt',
  prefillData: {
    externalId: attendee.externalId,
    userName: attendee.userName,
    userTitle: attendee.userTitle,
    userCompany: attendee.userCompany,
    userPhoto: attendee.userPhoto,
    email: attendee.email,
    phone: attendee.phone,
    registrationId: attendee.registrationId,
    sessionTitle: attendee.sessionTitle,
  },
}
</script>

<template>
  <div class="success-page">
    <div class="page-container">
      <div class="success-content">
        <div class="success-header">
          <div class="profile-avatar">
            <img
              :src="attendee.userPhoto"
              :alt="attendee.userName"
              style="
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #e5e7eb;
              "
            />
          </div>
          <h1>{{ attendee.userName }}</h1>
          <p class="success-message">
            {{ attendee.userTitle }} at <strong>{{ attendee.userCompany }}</strong>
          </p>
          <p style="color: #6b7280; font-size: 0.875rem; margin-top: 0.5rem">
            {{ attendee.sessionTitle }} &middot; Registration #{{ attendee.registrationId }}
          </p>
        </div>

        <div style="margin: 2rem 0">
          <h3 style="text-align: center; margin-bottom: 0.5rem; color: #1f2937">
            Create Your Event Poster
          </h3>
          <p style="text-align: center; color: #4b5563; margin-bottom: 1.5rem">
            Your profile info is already filled in. Personalize and share your poster!
          </p>
          <PosterWidget :config="premagicConfig" />
        </div>

        <div class="success-actions">
          <button class="btn-primary" @click="router.push('/register/select')">Back to Event Page</button>
        </div>
      </div>
    </div>
  </div>
</template>
