# Premagic Integration Guide

> This document is designed for AI coding assistants (Cursor, Copilot, ChatGPT, Codex, Windsurf, etc.) to understand and generate Premagic integration code. It is also useful for developers as a complete reference.

## Overview

Premagic provides 3 features for event registration websites:

| # | Feature | What it does | Where to place it |
|---|---------|-------------|-------------------|
| 1 | **Quick Register (LoginWidget)** | LinkedIn login button + automatic form autofill | Registration / sign-up page |
| 2 | **Poster Widget (PosterWidget)** | Attendee poster creator + social sharing | Success / confirmation page (after registration) |
| 3 | **Advocate Revenue Tracking** | Track ticket sales attributed to poster link referrals | Checkout / payment success page (after purchase) |

## Prerequisites

### Tracking Script

Add this script to the `<head>` section of **every page** on the site. It is required for all 3 features to work:

```html
<script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
```

For the widget features (Quick Register and Poster Widget), also add this preload hint for faster loading:

```html
<link rel="preload" href="https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js" as="script" crossorigin="anonymous" />
```

### Configuration

Both widget features (Quick Register and Poster Widget) require a config object:

```js
const premagicConfig = {
  shareId: "YOUR_SHARE_ID",       // Required -- your Premagic share ID
  websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026, still required for now
  domain: "YOUR_DOMAIN"           // DEPRECATED: will be removed in Q2 2026, still required for now
};
```

**IMPORTANT:** `projectId` and `eventId` have been REMOVED. Do NOT include them.

---

## Feature 1: Quick Register (LoginWidget)

### Purpose
Renders a LinkedIn "Quick Register" button on registration pages. When clicked, it authenticates the user via LinkedIn and can autofill form fields (name, email, company, etc.) using their LinkedIn profile data.

### Placement
Add to your **registration / sign-up page**, above or near the registration form.

### Container Element
Add this element where you want the widget to appear:

```html
<div id="widget-premagic"></div>
```

The ID **must** be `widget-premagic`.

### Widget Core JavaScript

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

### Initialization

On component mount, call:

```js
initWidget({
  shareId: "YOUR_SHARE_ID",
  websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026
  domain: "YOUR_DOMAIN",          // DEPRECATED: will be removed in Q2 2026
  embedWidgetFlow: "registration",
  redirectUrl: "",                 // Optional: URL to redirect after login
  autofillerConfig: { enabled: true }  // Optional: enables form field autofill
}, "widget-premagic");
```

### Cleanup

On component unmount/destroy, call:

```js
unmountWidget();
```

### LoginWidget Config Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `shareId` | string | Yes | Your Premagic share ID |
| `websiteId` | string | Yes | DEPRECATED -- removing Q2 2026 |
| `domain` | string | Yes | DEPRECATED -- removing Q2 2026 |
| `embedWidgetFlow` | string | Yes | Must be `"registration"` |
| `redirectUrl` | string | No | URL to redirect after login. Default: `""` |
| `autofillerConfig` | object | No | Default: `{ enabled: true }`. Autofills form fields from LinkedIn profile |

---

## Feature 2: Poster Widget (PosterWidget)

### Purpose
Renders a poster creator that lets attendees generate personalized event posters and share them on social media. The shared poster links include tracking for advocate attribution.

### Placement
Add to your **success / confirmation page**, after registration or ticket purchase.

### Container Element
Same as LoginWidget:

```html
<div id="widget-premagic"></div>
```

### Widget Core JavaScript
Uses the same `loadScript()`, `initWidget()`, and `unmountWidget()` functions as the LoginWidget (see Feature 1 above). Do NOT duplicate the script -- reuse the same functions.

### Initialization

On component mount, call:

```js
initWidget({
  shareId: "YOUR_SHARE_ID",
  websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026
  domain: "YOUR_DOMAIN",          // DEPRECATED: will be removed in Q2 2026
  embedWidgetFlow: "poster_creation",
  type: "ATTENDEE",               // Optional: default "ATTENDEE"
  widgetStyle: "preview"          // Optional: default "preview"
}, "widget-premagic");
```

### Cleanup

On component unmount/destroy, call:

```js
unmountWidget();
```

### PosterWidget Config Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `shareId` | string | Yes | Your Premagic share ID |
| `websiteId` | string | Yes | DEPRECATED -- removing Q2 2026 |
| `domain` | string | Yes | DEPRECATED -- removing Q2 2026 |
| `embedWidgetFlow` | string | Yes | Must be `"poster_creation"` |
| `type` | string | No | Default: `"ATTENDEE"` |
| `widgetStyle` | string | No | Default: `"preview"` |

---

## Feature 3: Advocate Revenue Tracking

### Purpose
Tracks ticket sales and calculates ROI for event advocates. When an attendee shares a poster (via the Poster Widget), the shared link contains tracking parameters. When someone clicks that link and later purchases a ticket, calling `trackPurchase` attributes the sale to the advocate who shared the poster.

### Prerequisite
The conversion tracker script must already be in `<head>`:

```html
<script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
```

This is the same script required for the widgets. If you already have it, no additional scripts are needed.

### Placement
Call this on your **checkout / payment success page**, after a successful purchase.

### Code

```js
window.AdvocateTracking.trackPurchase({
  orderId: '12345',      // Your unique order ID for reconciliation
  orderCount: 2,         // Number of tickets/items purchased
  value: 100.00,         // Total order value (without currency symbol)
  currency: 'USD'        // Currency code in ISO 4217 format (e.g., USD, EUR, GBP)
});
```

### trackPurchase Parameters

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `orderId` | string | Yes | Unique order ID for reconciliation |
| `orderCount` | number | Yes | Number of tickets or items purchased |
| `value` | number | Yes | Total order value as a number (no currency symbol) |
| `currency` | string | Yes | ISO 4217 currency code (e.g., `"USD"`, `"EUR"`, `"GBP"`, `"EGP"`) |

### Important Notes

- This is plain JavaScript -- no framework-specific wrapper or component is needed
- Call it once per successful purchase, after payment is confirmed
- The `ptm.js` script automatically captures referral data from poster links, so `trackPurchase` only needs the order details
- If the purchase was not referred by a poster link, the call is safely ignored

---

## Integration Rules

1. The widget container element ID **must** be `widget-premagic`
2. Always call `unmountWidget()` on component cleanup to prevent memory leaks
3. The `loadScript()` function is idempotent -- safe to call multiple times
4. Both widgets retry DOM element lookup up to 10 times (100ms max wait)
5. Form field selectors for autofill are configured server-side via the Premagic API
6. Do NOT include `projectId` or `eventId` in any config -- they have been removed
7. `websiteId` and `domain` are deprecated and will be removed in Q2 2026, but are still required for now

## Framework-Specific Guides

For ready-to-copy component code in your framework, see:

- [react/LLM_GUIDE.md](react/LLM_GUIDE.md) -- React 18 components
- [angular/LLM_GUIDE.md](angular/LLM_GUIDE.md) -- Angular 17+ standalone components
- [vue/LLM_GUIDE.md](vue/LLM_GUIDE.md) -- Vue 3 Composition API components
