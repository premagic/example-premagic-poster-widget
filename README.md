# Premagic Widget Integration Samples

Sample apps demonstrating how to integrate **Premagic widgets** into event registration flows across multiple frameworks.

## Widgets

| Widget | Purpose | Where to use |
|--------|---------|-------------|
| **LoginWidget** | LinkedIn login + form autofill for attendee registration | Registration / sign-up page |
| **PosterWidget** | Attendee poster creator & social sharing | Success / confirmation page |

## Framework Samples

Each subfolder contains a complete, runnable sample app with the same 3-page event registration flow:

| Framework | Folder | Quick Start |
|-----------|--------|-------------|
| React 18 | [`react/`](react/) | `cd react && npm install && npm start` |
| Angular 17+ | [`angular/`](angular/) | `cd angular && npm install && npm start` |
| Vue 3 | [`vue/`](vue/) | `cd vue && npm install && npm run dev` |

## Configuration

Pass a config object to each widget:

```js
const premagicConfig = {
  shareId: "YOUR_SHARE_ID",       // Required
  websiteId: "YOUR_WEBSITE_ID",   // Deprecated: removing Q2 2026
  domain: "YOUR_DOMAIN"           // Deprecated: removing Q2 2026
};
```

> **Note:** `projectId` and `eventId` have been removed. `websiteId` and `domain` are deprecated and will be removed in Q2 2026.

## Tracking Scripts

Add these to the `<head>` of every page where widgets are used:

```html
<link rel="preload" href="https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js" as="script" crossorigin="anonymous" />
<script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
```

## Widget API Reference

### LoginWidget

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `shareId` | string | Yes | Your Premagic share ID |
| `websiteId` | string | Yes | Deprecated -- removing Q2 2026 |
| `domain` | string | Yes | Deprecated -- removing Q2 2026 |
| `redirectUrl` | string | No | URL to redirect after login |
| `autofillerConfig` | object | No | Default: `{ enabled: true }` |

### PosterWidget

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `shareId` | string | Yes | Your Premagic share ID |
| `websiteId` | string | Yes | Deprecated -- removing Q2 2026 |
| `domain` | string | Yes | Deprecated -- removing Q2 2026 |
| `type` | string | No | Default: `"ATTENDEE"` |
| `widgetStyle` | string | No | Default: `"preview"` |

## Notes

- Both widgets are self-contained and handle script loading, initialization, and cleanup automatically
- Form field selectors for autofill are configured via the Premagic API
- Widgets automatically re-initialize when navigating between pages

---

## Integrate with AI / LLM

Copy the block below and paste it into your LLM (ChatGPT, Cursor, Copilot, etc.) to integrate Premagic widgets into your project. Replace placeholder values with your actual config.

<details>
<summary>Click to expand LLM prompt</summary>

````text
I need to integrate two Premagic widgets into my event registration web app. Here is everything you need to know:

## What are Premagic Widgets?

1. **LoginWidget** - Renders a LinkedIn login button + optional form autofill on registration pages. Place it on your registration/sign-up page.
2. **PosterWidget** - Renders an attendee poster creator + social sharing. Place it on your success/confirmation page (after registration).

## Step 1: Add Tracking Scripts

Add these two tags inside <head> on every page that uses a widget:

```html
<link rel="preload" href="https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js" as="script" crossorigin="anonymous" />
<script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
```

## Step 2: Widget Core JavaScript

Both widgets share this initialization code. Adapt it to your framework's lifecycle (e.g., useEffect in React, onMounted in Vue, ngOnInit in Angular):

```js
const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js';

function loadScript() {
  if (document.getElementById('premagic') || window.premagic) return;
  (function(w,d,s,o,f,js,fjs){
    w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};
    js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=PM_URL;js.defer=1;js.type='module';
    (fjs?.parentNode?fjs.parentNode.insertBefore(js,fjs):d.head.appendChild(js));
  })(window,document,"script","premagic",PM_URL);
}

function initWidget(config, elementId, retryCount = 0) {
  loadScript();
  window.premagic = window.premagic || function () {
    (window.premagic.q = window.premagic.q || []).push(arguments);
  };
  const element = document.getElementById(elementId);
  if (element) {
    window.premagic("init", config);
  } else if (retryCount < 10) {
    setTimeout(() => initWidget(config, elementId, retryCount + 1), 10);
  }
}

function unmountWidget() {
  if (window.premagic && typeof window.premagic === 'function') {
    window.premagic("unmount");
  }
}
```

## Step 3: Configuration

```js
const config = {
  shareId: "YOUR_SHARE_ID",       // Required - your Premagic share ID
  websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026, still required for now
  domain: "YOUR_DOMAIN"           // DEPRECATED: will be removed in Q2 2026, still required for now
};
```

NOTE: `projectId` and `eventId` are REMOVED and should NOT be included.

## Step 4: LoginWidget (Registration Page)

1. Add a container element: `<div id="widget-premagic"></div>`
2. On component mount, call:
   ```js
   initWidget({
     ...config,
     embedWidgetFlow: "registration",
     redirectUrl: "",                              // optional
     autofillerConfig: { enabled: true }           // optional, enables form autofill
   }, "widget-premagic");
   ```
3. On component unmount, call `unmountWidget()`.

## Step 5: PosterWidget (Success/Confirmation Page)

1. Add a container element: `<div id="widget-premagic"></div>`
2. On component mount, call:
   ```js
   initWidget({
     ...config,
     embedWidgetFlow: "poster_creation",
     type: "ATTENDEE",         // optional, default
     widgetStyle: "preview"    // optional, default
   }, "widget-premagic");
   ```
3. On component unmount, call `unmountWidget()`.

## Important Notes

- The widget element ID must be `widget-premagic`
- Always call `unmountWidget()` on cleanup to prevent memory leaks
- The script loading is idempotent (safe to call multiple times)
- Both widgets handle their own initialization retry logic (up to 100ms wait for DOM)
- Form field selectors for autofill are configured server-side via the Premagic API

Please generate the widget integration code for my framework: [SPECIFY YOUR FRAMEWORK HERE, e.g., React, Vue 3, Angular, Svelte, Next.js, etc.]
````

</details>
