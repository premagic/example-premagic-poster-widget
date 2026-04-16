# Premagic Integration Guide -- Vue

> Vue 3 Composition API component code and usage examples for Premagic widgets.
> For the full integration reference (all 3 features, config details, tracking), see the [root LLM_GUIDE.md](../LLM_GUIDE.md).

## Quick Start

```bash
# This project uses Vue 3 with Vite
cd vue
npm install
npm run dev
```

---

## LoginWidget Component

Copy this file into your project (e.g., `src/premagic-widgets/LoginWidget.vue`):

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js'
const ELEMENT_ID = 'widget-premagic'

function loadScript() {
  if (document.getElementById('premagic') || window.premagic) return
  ;(function (w, d, s, o, f, js, fjs) {
    w[o] =
      w[o] ||
      function () {
        ;(w[o].q = w[o].q || []).push(arguments)
      }
    js = d.createElement(s)
    fjs = d.getElementsByTagName(s)[0]
    js.id = o
    js.src = PM_URL
    js.defer = 1
    js.type = 'module'
    ;(fjs?.parentNode ? fjs.parentNode.insertBefore(js, fjs) : d.head.appendChild(js))
  })(window, document, 'script', 'premagic', PM_URL)
}

function initWidget(config, elementId, retryCount = 0) {
  loadScript()
  window.premagic =
    window.premagic ||
    function () {
      ;(window.premagic.q = window.premagic.q || []).push(arguments)
    }
  const element = document.getElementById(elementId)
  if (element) {
    window.premagic('init', config)
  } else if (retryCount < 10) {
    setTimeout(() => initWidget(config, elementId, retryCount + 1), 10)
  }
}

function unmountWidget() {
  if (window.premagic && typeof window.premagic === 'function') {
    window.premagic('unmount')
  }
}

onMounted(() => {
  const widgetConfig = {
    shareId: props.config.shareId,
    embedWidgetFlow: 'registration',
    redirectUrl: props.config.redirectUrl || '',
    autofillerConfig: props.config.autofillerConfig || { enabled: true },
  }
  initWidget(widgetConfig, ELEMENT_ID)
})

onUnmounted(() => {
  unmountWidget()
})
</script>

<template>
  <div :id="ELEMENT_ID">
    <div style="padding: 2rem; text-align: center; color: #999">
      <div
        style="
          width: 40px; height: 40px;
          border: 3px solid #e0e0e0; border-top-color: #667eea;
          border-radius: 50%; animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        "
      ></div>
      <p>Loading widget...</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

### Usage

```vue
<script setup>
import LoginWidget from './premagic-widgets/LoginWidget.vue'

const premagicConfig = {
  shareId: 'YOUR_SHARE_ID',
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <LoginWidget :config="premagicConfig" />
    <!-- Your registration form below -->
  </div>
</template>
```

---

## PosterWidget Component

Copy this file into your project (e.g., `src/premagic-widgets/PosterWidget.vue`):

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
})

const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js'
const ELEMENT_ID = 'widget-premagic'

function loadScript() {
  if (document.getElementById('premagic') || window.premagic) return
  ;(function (w, d, s, o, f, js, fjs) {
    w[o] =
      w[o] ||
      function () {
        ;(w[o].q = w[o].q || []).push(arguments)
      }
    js = d.createElement(s)
    fjs = d.getElementsByTagName(s)[0]
    js.id = o
    js.src = PM_URL
    js.defer = 1
    js.type = 'module'
    ;(fjs?.parentNode ? fjs.parentNode.insertBefore(js, fjs) : d.head.appendChild(js))
  })(window, document, 'script', 'premagic', PM_URL)
}

function initWidget(config, elementId, retryCount = 0) {
  loadScript()
  window.premagic =
    window.premagic ||
    function () {
      ;(window.premagic.q = window.premagic.q || []).push(arguments)
    }
  const element = document.getElementById(elementId)
  if (element) {
    window.premagic('init', config)
  } else if (retryCount < 10) {
    setTimeout(() => initWidget(config, elementId, retryCount + 1), 10)
  }
}

function unmountWidget() {
  if (window.premagic && typeof window.premagic === 'function') {
    window.premagic('unmount')
  }
}

onMounted(() => {
  const widgetConfig = {
    shareId: props.config.shareId,
    embedWidgetFlow: 'poster_creation',
    type: props.config.type || 'ATTENDEE',
    widgetStyle: props.config.widgetStyle || 'preview',
  }
  initWidget(widgetConfig, ELEMENT_ID)
})

onUnmounted(() => {
  unmountWidget()
})
</script>

<template>
  <div :id="ELEMENT_ID">
    <div style="padding: 2rem; text-align: center; color: #999">
      <div
        style="
          width: 40px; height: 40px;
          border: 3px solid #e0e0e0; border-top-color: #667eea;
          border-radius: 50%; animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        "
      ></div>
      <p>Loading widget...</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

### Usage

```vue
<script setup>
import PosterWidget from './premagic-widgets/PosterWidget.vue'

const premagicConfig = {
  shareId: 'YOUR_SHARE_ID',
}
</script>

<template>
  <div>
    <h1>Registration Successful!</h1>
    <PosterWidget :config="premagicConfig" />
  </div>
</template>
```

---

## PosterWidget with Pre-filled Data (No LoginWidget)

When you already have user data from your own auth system and don't need the LinkedIn login (LoginWidget), pass a `prefillData` object to the PosterWidget config to pre-populate the poster with attendee details. This is ideal for attendee profile pages, post-purchase confirmation, or exhibitor dashboards.

```vue
<script setup>
import PosterWidget from './premagic-widgets/PosterWidget.vue'

// In a real app, this data comes from your auth system / API
const attendee = {
  externalId: 'ext_12345',
  userName: 'John Doe',
  userTitle: 'Senior Developer',
  userCompany: 'Acme Corp',
  userPhoto: 'https://example.com/photo.jpg',
  email: 'john@example.com',
  phone: '+1234567890',
  registrationId: 'reg_67890',
  sessionTitle: 'Conference 2025',
}

const premagicConfig = {
  shareId: 'YOUR_SHARE_ID',
  prefillData: {
    externalId: attendee.externalId,   // External user ID (optional)
    userName: attendee.userName,        // Full name (optional)
    userTitle: attendee.userTitle,      // Job title or role (optional)
    userCompany: attendee.userCompany,  // Company name (optional)
    userPhoto: attendee.userPhoto,      // URL to profile photo (optional)
    email: attendee.email,              // Email address (optional)
    phone: attendee.phone,              // Phone number (optional)
    registrationId: attendee.registrationId, // Registration ID (optional)
    sessionTitle: attendee.sessionTitle,     // Session or event title (optional)
    exhibitorLogo: '',                  // URL to exhibitor logo (optional)
    exhibitorBoothNumber: '',           // Booth number (optional)
  },
}
</script>

<template>
  <div>
    <h1>{{ attendee.userName }}'s Profile</h1>
    <PosterWidget :config="premagicConfig" />
  </div>
</template>
```

See the [root LLM_GUIDE.md](../LLM_GUIDE.md#prefilldata-reference) for the full prefillData field reference. A working example is in `src/pages/ProfilePage.vue`.

---

## Advocate Revenue Tracking (Vue)

This feature is framework-agnostic (plain JS), but here is how to call it in a Vue component:

```vue
<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  orderId: String,
  orderCount: Number,
  totalValue: Number,
  currency: String,
})

onMounted(() => {
  // Call after payment is confirmed
  window.AdvocateTracking.trackPurchase({
    orderId: props.orderId,
    orderCount: props.orderCount,
    value: props.totalValue,
    currency: props.currency  // ISO 4217: 'USD', 'EUR', 'GBP', etc.
  })
})
</script>

<template>
  <h1>Payment Successful!</h1>
</template>
```

See the [root LLM_GUIDE.md](../LLM_GUIDE.md#feature-3-advocate-revenue-tracking) for full parameter details and notes.
