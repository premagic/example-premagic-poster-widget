<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const FORM_FIELD_IDS = ['firstName', 'lastName', 'emailId', 'emailIdConfirmation', 'companyName', 'jobTitle', 'linkedinProfile']

const formData = reactive({
  firstName: '',
  lastName: '',
  emailId: '',
  emailIdConfirmation: '',
  companyName: '',
  jobTitle: '',
  linkedinProfile: '',
})

/**
 * EXTERNAL AUTOFILL SYNC
 *
 * The Premagic LoginWidget autofills form fields by setting DOM input .value
 * directly. Vue's v-model does NOT detect programmatic .value changes -- only
 * user-dispatched input events. This polling mechanism checks every 500ms if
 * any DOM input value differs from the reactive data and syncs them.
 */
let pollInterval = null

function syncDomToState() {
  FORM_FIELD_IDS.forEach((id) => {
    const input = document.getElementById(id)
    if (input && input.value !== formData[id]) {
      formData[id] = input.value
    }
  })

  // Stop polling once required fields are filled
  if (formData.firstName && formData.lastName && formData.emailId) {
    stopPolling()
  }
}

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
}

onMounted(() => {
  pollInterval = setInterval(syncDomToState, 500)
})

onUnmounted(() => {
  stopPolling()
})

function handleSubmit(e) {
  e.preventDefault()
  // Final sync before submit
  syncDomToState()
  emit('submit', { ...formData })
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <form class="registration-form" @submit="handleSubmit">
    <div class="form-row">
      <div class="form-group">
        <label for="firstName">First Name *</label>
        <input
          id="firstName"
          name="firstName"
          v-model="formData.firstName"
          type="text"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name *</label>
        <input
          id="lastName"
          name="lastName"
          v-model="formData.lastName"
          type="text"
          placeholder="Enter your last name"
          required
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="emailId">Email Address *</label>
        <input
          id="emailId"
          name="emailId"
          v-model="formData.emailId"
          type="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div class="form-group">
        <label for="emailIdConfirmation">Confirm Email Address *</label>
        <input
          id="emailIdConfirmation"
          name="emailIdConfirmation"
          v-model="formData.emailIdConfirmation"
          type="email"
          placeholder="Confirm your email address"
          required
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input
          id="companyName"
          name="companyName"
          v-model="formData.companyName"
          type="text"
          placeholder="Enter your company name"
        />
      </div>
      <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input
          id="jobTitle"
          name="jobTitle"
          v-model="formData.jobTitle"
          type="text"
          placeholder="Enter your job title"
        />
      </div>
    </div>

    <div class="form-group">
      <label for="linkedinProfile">LinkedIn Profile</label>
      <input
        id="linkedinProfile"
        name="linkedinProfile"
        v-model="formData.linkedinProfile"
        type="url"
        placeholder="https://linkedin.com/in/your-profile"
      />
    </div>

    <div class="form-actions">
      <button type="button" class="btn-secondary" @click="handleCancel">
        Cancel
      </button>
      <button type="submit" class="btn-primary">
        Complete Registration
      </button>
    </div>
  </form>
</template>
