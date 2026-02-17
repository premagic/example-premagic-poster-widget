# Premagic Widget Integration Samples

Sample apps demonstrating how to integrate **Premagic widgets** into event registration flows across multiple frameworks.

## Widgets

| Widget | Purpose | Where to use |
|--------|---------|-------------|
| **LoginWidget** | LinkedIn login + form autofill for attendee registration | Registration / sign-up page |
| **PosterWidget** | Attendee poster creator & social sharing | Success / confirmation page |
| **Advocate Revenue Tracking** | Track ticket sales attributed to poster link referrals | Checkout / payment success page |

## Framework Samples

Each subfolder contains a complete, runnable sample app with a 4-page event registration flow:

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

> **Note:** `websiteId` and `domain` are deprecated and will be removed in Q2 2026, still required for now.

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
| `prefillData` | object | No | Pre-populate poster with attendee data (see below) |

### PosterWidget with `prefillData` (No LoginWidget)

When you already have user information from your own auth system (no LinkedIn login needed), pass `prefillData` in the config to skip the LoginWidget and go straight to poster creation. This is useful for attendee profile pages, post-purchase confirmations, or exhibitor dashboards.

```js
const premagicConfig = {
  shareId: "YOUR_SHARE_ID",
  websiteId: "YOUR_WEBSITE_ID",   // Deprecated: removing Q2 2026
  domain: "YOUR_DOMAIN",          // Deprecated: removing Q2 2026
  prefillData: {
    externalId: "ext_12345",         // External user ID from your system (optional)
    userName: "John Doe",            // Full name (optional)
    userTitle: "Senior Developer",   // Job title or role (optional)
    userCompany: "Acme Corp",        // Company name (optional)
    userPhoto: "https://example.com/photo.jpg", // URL to profile photo (optional)
    email: "john@example.com",       // Email address (optional)
    phone: "+1234567890",            // Phone number (optional)
    registrationId: "reg_12345",     // Registration ID (optional)
    sessionTitle: "Conference 2025", // Session or event title (optional)
    exhibitorLogo: "https://example.com/logo.jpg", // Exhibitor logo URL (optional)
    exhibitorBoothNumber: "101"      // Booth number (optional)
  }
};
```

Each sample app includes a `/profile` page demonstrating this pattern.

## Advocate Revenue Tracking

Track ticket sales and calculate ROI for your event advocates. When attendees share posters (via the Poster Widget), the shared links contain tracking parameters. When someone clicks a poster link and purchases a ticket, you can attribute the sale to the advocate.

### 1. Add the Tracking Script

The conversion tracker script (`ptm.js`) should already be in your `<head>` (see [Tracking Scripts](#tracking-scripts) above). It must be present on **all pages** to capture traffic from poster links.

### 2. Track Purchases

Add this code to your **checkout success page**. Call it after a successful purchase:

```js
window.AdvocateTracking.trackPurchase({
  orderId: '12345',      // Your unique order ID for reconciliation
  orderCount: 2,         // Number of tickets/items purchased
  value: 100.00,         // Total order value (without currency symbol)
  currency: 'USD'        // Currency code in ISO 4217 format (e.g., USD, EUR, GBP)
});
```

> **Note:** This is plain JavaScript -- no framework-specific wrapper needed. Just call it after payment confirmation.

## Notes

- Both widgets are self-contained and handle script loading, initialization, and cleanup automatically
- Form field selectors for autofill are configured via the Premagic API
- Widgets automatically re-initialize when navigating between pages
- `projectId` and `eventId` have been removed -- do NOT include them in any config

---

## Integrate with AI / LLM

See [`LLM_GUIDE.md`](LLM_GUIDE.md) for a complete integration reference that you can provide to any AI coding assistant (Cursor, Copilot, ChatGPT, Windsurf, Codex, etc.).

Each framework folder also has its own `LLM_GUIDE.md` with ready-to-copy component code:

- [`react/LLM_GUIDE.md`](react/LLM_GUIDE.md)
- [`angular/LLM_GUIDE.md`](angular/LLM_GUIDE.md)
- [`vue/LLM_GUIDE.md`](vue/LLM_GUIDE.md)
