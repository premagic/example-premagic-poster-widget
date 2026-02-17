<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const formData = reactive({
  firstName: '',
  lastName: '',
  emailId: '',
  emailIdConfirmation: '',
  companyName: '',
  jobTitle: '',
  linkedinProfile: '',
})

function handleSubmit(e) {
  e.preventDefault()
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
          v-model="formData.companyName"
          type="text"
          placeholder="Enter your company name"
        />
      </div>
      <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input
          id="jobTitle"
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
