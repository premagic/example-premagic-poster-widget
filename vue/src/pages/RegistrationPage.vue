<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginWidget from '../premagic-widgets/LoginWidget.vue'
import RegistrationForm from '../components/RegistrationForm.vue'

const router = useRouter()

const ticket = ref(null)

onMounted(() => {
  const state = history.state
  if (state && state.ticket) {
    ticket.value = state.ticket
  }
})

const premagicConfig = {
  shareId: 'AI-everything-Egypt',
  websiteId: 'ai-everything-egypt', // DEPRECATED: will be removed in Q2 2026
  domain: 'aieverything', // DEPRECATED: will be removed in Q2 2026
}

function handleSubmit(formData) {
  const registrationData = {
    ...formData,
    ticket: ticket.value,
    registeredAt: new Date().toISOString(),
  }
  sessionStorage.setItem(
    'registrationData',
    JSON.stringify(registrationData)
  )
  window.location.href = '/register/success'
}

function handleCancel() {
  router.push('/register/select')
}
</script>

<template>
  <div class="registration-page">
    <div class="page-container">
      <div v-if="!ticket" class="error-message">
        <h2>No Ticket Selected</h2>
        <p>Please go back and select a ticket first.</p>
        <button @click="router.push('/register/select')">Back to Event Page</button>
      </div>

      <template v-else>
        <div class="registration-header">
          <h1>Register for AI Everything Egypt</h1>
          <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.1rem">
            {{ ticket.name }} Ticket - {{ ticket.price }} {{ ticket.currency }}
          </p>
        </div>

        <div class="registration-content">
          <LoginWidget :config="premagicConfig" />
          <RegistrationForm
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </div>
      </template>
    </div>
  </div>
</template>
