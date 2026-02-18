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
Add to your **success / confirmation page** (after registration) or **attendee profile page** (when user data is already available from your own system).

### Container Element
Same as LoginWidget:

```html
<div id="widget-premagic"></div>
```

### Widget Core JavaScript
Uses the same `loadScript()`, `initWidget()`, and `unmountWidget()` functions as the LoginWidget (see Feature 1 above). Do NOT duplicate the script -- reuse the same functions.

### Initialization (Basic)

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

### Initialization with Pre-filled Data (No LoginWidget)

When you already have user information from your own authentication system and do **not** need the LoginWidget, you can pass a `prefillData` object to pre-populate the poster with attendee details:

```js
initWidget({
  shareId: "YOUR_SHARE_ID",
  websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026
  domain: "YOUR_DOMAIN",          // DEPRECATED: will be removed in Q2 2026
  embedWidgetFlow: "poster_creation",
  type: "ATTENDEE",
  widgetStyle: "preview",
  prefillData: {
    externalId: "ext_12345",         // External user ID from your system (optional)
    userName: "John Doe",            // Full name of the user (optional)
    userTitle: "Senior Developer",   // Job title or role (optional)
    userCompany: "Acme Corp",        // Company name (optional)
    userPhoto: "https://example.com/photo.jpg", // URL to user profile photo (optional)
    email: "john@example.com",       // Email address (optional)
    phone: "+1234567890",            // Phone number (optional)
    registrationId: "reg_12345",     // Registration ID (optional)
    sessionTitle: "Conference 2025", // Session or event title (optional)
    exhibitorLogo: "https://example.com/exhibitor-logo.jpg", // URL to exhibitor logo (optional)
    exhibitorBoothNumber: "101"      // Booth number (optional)
  }
}, "widget-premagic");
```

This is useful for:
- **Attendee profile pages** where the user is already logged into your system
- **Post-purchase confirmation** where you have the buyer's details from the order
- **Exhibitor/sponsor dashboards** where company info is already known
- Any page where you want to skip the LinkedIn login step and go straight to poster creation

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
| `prefillData` | object | No | Pre-populate poster with attendee details (see below) |

### prefillData Reference

All fields are optional. Pass only the ones you have:

| Property | Type | Description |
|----------|------|-------------|
| `externalId` | string | External user ID from your system (for reconciliation) |
| `userName` | string | Full name of the attendee |
| `userTitle` | string | Job title or role |
| `userCompany` | string | Company or organization name |
| `userPhoto` | string | URL to user's profile photo |
| `email` | string | Email address |
| `phone` | string | Phone number |
| `registrationId` | string | Registration ID from your system |
| `sessionTitle` | string | Session or event title |
| `exhibitorLogo` | string | URL to exhibitor/sponsor logo |
| `exhibitorBoothNumber` | string | Booth number (for exhibitors) |

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

## IMPORTANT: Autofill Sync for Framework Forms

The LoginWidget autofills form fields by setting DOM input `.value` properties directly. Most modern frameworks (React, Angular, Vue) do **NOT** detect programmatic DOM value changes -- they only track values through their own state/model bindings. This means autofilled data will appear visually in the inputs but won't be captured when the form is submitted.

**You MUST add a polling mechanism** to sync DOM values back into your framework's form state. Poll every 500ms, compare each input's DOM `.value` against the framework's model, and update the model when they differ. Stop polling once required fields are filled.

Example pattern (framework-agnostic):

```js
const FIELD_IDS = ['firstName', 'lastName', 'emailId', 'companyName', 'jobTitle'];

const pollInterval = setInterval(() => {
  FIELD_IDS.forEach(id => {
    const input = document.getElementById(id);
    if (input && input.value !== getModelValue(id)) {
      setModelValue(id, input.value);  // Update your framework's state/model
    }
  });
}, 500);
```

See each framework's `LLM_GUIDE.md` for the specific implementation (React `useEffect` + `useState`, Angular `AfterViewInit` + `FormGroup.setValue`, Vue `onMounted` + reactive).

## Framework-Specific Guides

For ready-to-copy component code in your framework, see:

- [react/LLM_GUIDE.md](react/LLM_GUIDE.md) -- React 18 components
- [angular/LLM_GUIDE.md](angular/LLM_GUIDE.md) -- Angular 17+ standalone components
- [vue/LLM_GUIDE.md](vue/LLM_GUIDE.md) -- Vue 3 Composition API components
