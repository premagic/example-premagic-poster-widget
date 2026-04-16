<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PosterWidget from '../premagic-widgets/PosterWidget.vue'

const router = useRouter()

const registrationData = ref(null)

onMounted(() => {
  const state = history.state
  if (state && state.registrationData) {
    registrationData.value = state.registrationData
  } else {
    const stored = sessionStorage.getItem('registrationData')
    if (stored) {
      registrationData.value = JSON.parse(stored)
    }
  }
  sessionStorage.removeItem('registrationData')
})

const premagicConfig = {
  shareId: 'AI-everything-Egypt',
}
</script>

<template>
  <div class="success-page">
    <div class="page-container">
      <div v-if="!registrationData" class="error-message">
        <h2>No Registration Data</h2>
        <p>It seems you haven't completed the registration process.</p>
        <button @click="router.push('/register/select')">Back to Event Page</button>
      </div>

      <div v-else class="success-content">
        <div class="success-header">
          <div class="success-icon">✓</div>
          <h1>Registration Successful!</h1>
          <p class="success-message">
            Thank you, {{ registrationData.firstName }}! You have successfully
            registered for <strong>AI Everything Egypt</strong> with a
            <strong>{{ registrationData.ticket?.name }}</strong> ticket.
          </p>
          <p class="success-message">
            A confirmation email has been sent to
            <strong>{{ registrationData.emailId }}</strong>.
          </p>
        </div>

        <div>
          <p class="poster-description">
            Create your personalized event poster to share on social media!
          </p>
          <PosterWidget :config="premagicConfig" />
        </div>

        <div class="success-actions">
          <button class="btn-primary" @click="router.push('/register/select')">
            Back to Event Page
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
