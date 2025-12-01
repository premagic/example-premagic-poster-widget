# Premagic Event Example

A sample React event page demonstrating the integration of Premagic widgets for event registration and poster creation.

## Features

- **Event Page**: Display event information and ticket selection
- **Registration Form**: Form with Premagic Login widget for quick registration
- **Success Page**: Registration confirmation with Premagic Poster Creator widget
- **Hard Navigation**: Full page reload on success page for clean state management

## Getting Started

### Prerequisites

- Node.js (v20 LTS recommended, v14 or higher required)
- npm or yarn
- nvm (Node Version Manager) - optional but recommended

### Installation

1. **If using nvm**, install and use the correct Node version:
```bash
nvm install
nvm use
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Integration Guide for Clients

This guide explains how to integrate the Premagic widgets into your existing event application.

### Step 1: Copy Required Files

Copy the following files to your project:

#### Required Pages:
- `src/pages/EventPage.js` - Event information and ticket selection page
- `src/pages/RegistrationPage.js` - Registration page with Premagic Login widget
- `src/pages/SuccessPage.js` - Success page with Premagic Poster Creator widget

#### Required Components:
- `src/components/RegistrationForm.js` - Reusable registration form component

#### Required Premagic Widgets (All in one folder):
- `src/premagic-widgets/PremagicService.js` - Premagic widget service for easy integration
- `src/premagic-widgets/PremagicWidget.js` - Reusable Premagic widget component

#### Required Styles:
- `src/styles.css` - **Single unified CSS file** containing all styles for the entire application

#### Required Dependencies:
Make sure your `package.json` includes:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  }
}
```

### Step 2: Add Conversion Tracking Scripts

**IMPORTANT**: Add these scripts to the `<head>` tag of your main HTML file (usually `public/index.html` or your root HTML template):

```html
<!-- Premagic Conversion Tracking - Add to <head> tag -->
<link rel="preload" href="https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js" as="script" crossorigin="anonymous" />
<script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
```

**Where to add**: This should be in the `<head>` section of ALL pages where you want to track conversions.

### Step 3: Configure Premagic Widget Settings

You need to update the Premagic configuration in **two places**:

#### A. PremagicService.js - Configuration

Open `src/premagic-widgets/PremagicService.js` and update the `DEFAULT_CONFIG` object with your Premagic credentials:

```javascript
const DEFAULT_CONFIG = {
  shareId: "YOUR_SHARE_ID",              // ⚠️ REPLACE: Your share ID
  projectId: "YOUR_PROJECT_ID",           // ⚠️ REPLACE: Your project ID
  eventId: "YOUR_EVENT_ID",               // ⚠️ REPLACE: Your event ID
  websiteId: "YOUR_WEBSITE_ID",          // ⚠️ REPLACE: Your website ID
  domain: "YOUR_DOMAIN",                 // ⚠️ REPLACE: Your domain
};
```

**Key Points:**
- Update all IDs (shareId, projectId, eventId, websiteId, domain) with your actual Premagic credentials
- The `DEFAULT_AUTOFILLER_CONFIG.selectors` should match your HTML form field `name` attributes
- If your form uses different field names, update the selectors in `DEFAULT_AUTOFILLER_CONFIG`
- This configuration is used by both the Login Widget and Poster Creator Widget

## That's It!

Once you've completed these three steps, your Premagic widgets are installed and ready to use. The widgets will automatically load when the components are rendered.

## Project Structure

```
premagic-event-example/
├── public/
│   └── index.html          # HTML template with Premagic tracking scripts
├── src/
│   ├── pages/
│   │   ├── EventPage.js    # Event information and ticket selection
│   │   ├── RegistrationPage.js  # Registration page with login widget
│   │   └── SuccessPage.js # Success page with poster creator widget
│   ├── components/
│   │   └── RegistrationForm.js  # Reusable registration form component
│   ├── premagic-widgets/
│   │   ├── PremagicService.js  # Premagic widget service
│   │   └── PremagicWidget.js   # Reusable Premagic widget component
│   ├── styles.css          # Single unified CSS file for entire app
│   ├── App.js              # Main app component with routing
│   └── index.js            # Entry point
└── package.json
```

## Widget Details

### Login Widget (RegistrationPage.js)
- **Widget Type**: Registration/Login widget
- **Purpose**: Quick login and form autofill
- **Container ID**: `premagic-poster-creator-widget-root`
- **Service**: Uses `PremagicService.initLoginWidget()` from `premagic-widgets/`
- **Component**: Uses `<PremagicWidget variant="login" />` from `premagic-widgets/`

### Poster Creator Widget (SuccessPage.js)
- **Widget Type**: Poster creation widget
- **Purpose**: Allow attendees to create and share event posters
- **Container ID**: `premagic-poster-creator-widget-root`
- **Service**: Uses `PremagicService.initPosterCreatorWidget()` from `premagic-widgets/`
- **Component**: Uses `<PremagicWidget variant="poster" />` from `premagic-widgets/`

## Important Notes

1. **Configuration Values**: Make sure to update ALL configuration values (shareId, projectId, eventId, websiteId, domain) in `premagic-widgets/PremagicService.js` with your actual Premagic credentials. This single configuration is used by both widgets.

2. **Form Field Names**: The autofiller selectors in `premagic-widgets/PremagicService.js` (DEFAULT_AUTOFILLER_CONFIG) must match your HTML form field `name` attributes exactly. If your form uses different field names, update the selectors accordingly.

3. **All Premagic Code in One Place**: All Premagic-related code (service and widget component) is now in the `premagic-widgets/` folder for easy integration.

3. **Widget Container IDs**: Both widgets use the same container ID (`premagic-poster-creator-widget-root`). This is intentional and works correctly as they appear on different pages.

4. **Script Loading**: The Premagic widget script is loaded dynamically. The code handles cases where the script is already loaded or needs to be loaded fresh.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Troubleshooting

### Widget not appearing?
- Check browser console for errors
- Verify all configuration IDs are correct
- Ensure the widget container element exists in the DOM
- Check that the Premagic script is loading (Network tab in DevTools)

### Form autofill not working?
- Verify `autofillerConfig.selectors` match your form field `name` attributes
- Check that `autofillerConfig.enabled` is set to `true`
- Ensure the Premagic Login widget is properly initialized


## Support

For issues related to:
- **Premagic Widgets**: Contact Premagic support
- **Integration Questions**: Refer to this documentation or contact your integration team
