# Premagic Widgets for React

Two simple, self-contained React components for Premagic widgets:

1. **LoginWidget** - Quick LinkedIn login and form autofill for registration pages
2. **PosterWidget** - Allows attendees to create and share event posters on success/confirmation pages

## Usage

### 1. Copy the Widget Files

Copy `LoginWidget.js` and `PosterWidget.js` to your React project.

### 2. Add Tracking Scripts

Add these scripts to your HTML `<head>`:

```html
<link rel="preload" href="https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js" as="script" crossorigin="anonymous" />
<script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
```

### 3. Use the Widgets

#### LoginWidget

```jsx
import LoginWidget from './premagic-widgets/LoginWidget';

<LoginWidget config={{
  shareId: "YOUR_SHARE_ID",
  projectId: "YOUR_PROJECT_ID",
  eventId: "YOUR_EVENT_ID",
  websiteId: "YOUR_WEBSITE_ID",
  domain: "YOUR_DOMAIN"
}} />
```

#### PosterWidget

```jsx
import PosterWidget from './premagic-widgets/PosterWidget';

<PosterWidget config={{
  shareId: "YOUR_SHARE_ID",
  projectId: "YOUR_PROJECT_ID",
  eventId: "YOUR_EVENT_ID",
  websiteId: "YOUR_WEBSITE_ID",
  domain: "YOUR_DOMAIN"
}} />
```

## API Reference

### LoginWidget Props

- `config` (required) - Configuration object
  - `shareId` (string, required)
  - `projectId` (string, required)
  - `eventId` (string, required)
  - `websiteId` (string, required)
  - `domain` (string, required)
  - `redirectUrl` (string, optional)
  - `autofillerConfig` (object, optional)
- `containerClassName` (string, optional)

### PosterWidget Props

- `config` (required) - Configuration object
  - `shareId` (string, required)
  - `projectId` (string, required)
  - `eventId` (string, required)
  - `websiteId` (string, required)
  - `domain` (string, required)
  - `type` (string, optional) - Default: "ATTENDEE"
  - `widgetStyle` (string, optional) - Default: "preview"

## Notes

- Both widgets are self-contained and handle initialization/cleanup automatically
- Form field selectors for autofill are configured via Premagic API
- Widgets automatically re-initialize when navigating between pages
