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
          width: 40px;
          height: 40px;
          border: 3px solid #e0e0e0;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        "
      ></div>
      <p>Loading widget...</p>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
