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
    websiteId: props.config.websiteId, // DEPRECATED: will be removed in Q2 2026
    domain: props.config.domain, // DEPRECATED: will be removed in Q2 2026
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
  websiteId: 'YOUR_WEBSITE_ID',   // DEPRECATED: will be removed in Q2 2026
  domain: 'YOUR_DOMAIN',          // DEPRECATED: will be removed in Q2 2026
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
    websiteId: props.config.websiteId, // DEPRECATED: will be removed in Q2 2026
    domain: props.config.domain, // DEPRECATED: will be removed in Q2 2026
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
  websiteId: 'YOUR_WEBSITE_ID',   // DEPRECATED: will be removed in Q2 2026
  domain: 'YOUR_DOMAIN',          // DEPRECATED: will be removed in Q2 2026
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
