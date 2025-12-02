# Premagic Widgets for React

A simple guide to integrate Premagic Login and Poster Creator widgets into your React application.

## What Are Premagic Widgets?

Premagic provides two widgets for event applications:

1. **Login Widget** - Quick LinkedIn login and form autofill for registration pages
2. **Poster Creator Widget** - Allows attendees to create and share event posters on success/confirmation pages

## Quick Start

### Step 1: Install Dependencies

Make sure your React app has these dependencies:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0"
  }
}
```

### Step 2: Copy Premagic Widget Files

Copy these two files to your React project:

```
src/premagic-widgets/
├── PremagicService.js    # Widget initialization service
└── PremagicWidget.js     # React component wrapper
```

**These are the only files you need** - they handle all Premagic widget functionality.

### Step 3: Add Conversion Tracking Scripts

Add these scripts to the `<head>` tag of your main HTML file (`public/index.html` or your root HTML template):

```html
<head>
  <!-- Premagic Conversion Tracking -->
  <link rel="preload" href="https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js" as="script" crossorigin="anonymous" />
  <script src="https://asts.premagic.com/s/poster-conversion-tracker/ptm.js"></script>
</head>
```

**Important**: Add this to ALL pages where you want to track conversions.

### Step 4: Configure Your Premagic Credentials

Open `src/premagic-widgets/PremagicService.js` and update the `DEFAULT_CONFIG` object with your Premagic credentials:

```javascript
const DEFAULT_CONFIG = {
  shareId: "YOUR_SHARE_ID",              // ⚠️ REPLACE with your share ID
  projectId: "YOUR_PROJECT_ID",          // ⚠️ REPLACE with your project ID
  eventId: "YOUR_EVENT_ID",              // ⚠️ REPLACE with your event ID
  websiteId: "YOUR_WEBSITE_ID",          // ⚠️ REPLACE with your website ID
  domain: "YOUR_DOMAIN",                 // ⚠️ REPLACE with your domain
};
```

**Also update the autofiller selectors** if your form uses different field names:

```javascript
const DEFAULT_AUTOFILLER_CONFIG = {
  enabled: true,
  selectors: {
    firstName: "[name='firstName']",     // Update to match your form field names
    lastName: "[name='lastName']",
    email: "[name='emailId']",
    // ... other selectors
  }
};
```

### Step 5: Use the Widgets in Your React Components

#### Login Widget (Registration Page)

```jsx
import React, { useEffect } from 'react';
import { initLoginWidget } from './premagic-widgets/PremagicService';
import PremagicWidget from './premagic-widgets/PremagicWidget';

const RegistrationPage = () => {
  useEffect(() => {
    // Initialize the login widget
    initLoginWidget();
  }, []);

  return (
    <div>
      <h1>Register for Event</h1>
      
      {/* Premagic Login Widget */}
      <PremagicWidget variant="login" />
      
      {/* Your registration form */}
      <form>
        {/* form fields */}
      </form>
    </div>
  );
};
```

#### Poster Creator Widget (Success/Confirmation Page)

```jsx
import React, { useEffect } from 'react';
import { initPosterCreatorWidget } from './premagic-widgets/PremagicService';
import PremagicWidget from './premagic-widgets/PremagicWidget';

const SuccessPage = () => {
  useEffect(() => {
    // Initialize the poster creator widget
    initPosterCreatorWidget();
  }, []);

  return (
    <div>
      <h1>Registration Successful!</h1>
      
      {/* Premagic Poster Creator Widget */}
      <PremagicWidget 
        variant="poster"
        title="Create Your Event Poster"
        description="Personalize and share a poster to let your network know you're attending!"
      />
    </div>
  );
};
```

## How It Works

### Automatic Lifecycle Management

The `PremagicWidget` component handles everything automatically:

1. **Initialization**: When the component mounts, it initializes the widget
2. **Cleanup**: When the component unmounts, it automatically cleans up the widget
3. **Re-initialization**: When you navigate back to the page, the widget re-initializes with fresh state

**You don't need to manage widget lifecycle manually** - the component handles it all via React's `useEffect` cleanup.

### Widget Container

Both widgets use the same container ID: `premagic-poster-creator-widget-root`

This is intentional and works correctly because:
- Widgets appear on different pages
- The container is automatically created by the `PremagicWidget` component
- Each widget instance is properly isolated

## API Reference

### PremagicService Functions

#### `initLoginWidget(config?)`

Initializes the Premagic Login widget for registration forms.

```javascript
import { initLoginWidget } from './premagic-widgets/PremagicService';

// Use default config
initLoginWidget();

// Or override specific values
initLoginWidget({
  shareId: "custom-share-id",
  redirectUrl: "/custom-redirect"
});
```

**Config options:**
- `shareId` - Premagic share ID
- `projectId` - Premagic project ID
- `eventId` - Premagic event ID
- `websiteId` - Premagic website ID
- `domain` - Premagic domain
- `redirectUrl` - Optional redirect URL after login
- `autofillerConfig` - Autofiller configuration object

#### `initPosterCreatorWidget(config?)`

Initializes the Premagic Poster Creator widget for success/confirmation pages.

```javascript
import { initPosterCreatorWidget } from './premagic-widgets/PremagicService';

// Use default config
initPosterCreatorWidget();

// Or override specific values
initPosterCreatorWidget({
  shareId: "custom-share-id",
  type: "SPEAKER"
});
```

**Config options:**
- `shareId` - Premagic share ID
- `projectId` - Premagic project ID
- `eventId` - Premagic event ID
- `websiteId` - Premagic website ID
- `domain` - Premagic domain
- `type` - Widget type (default: "ATTENDEE")
- `widgetStyle` - Widget style (default: "preview")

#### `unmountWidget()`

Manually unmount a widget (usually not needed - handled automatically by `PremagicWidget`).

```javascript
import { unmountWidget } from './premagic-widgets/PremagicService';

unmountWidget();
```

### PremagicWidget Component

```jsx
<PremagicWidget 
  variant="login" | "poster"    // Required: Widget type
  containerClassName=""         // Optional: Additional CSS class
  title=""                       // Optional: Title (for poster widget)
  description=""                 // Optional: Description (for poster widget)
/>
```

**Props:**
- `variant` (required) - Either `"login"` or `"poster"`
- `containerClassName` (optional) - Additional CSS classes for the container
- `title` (optional) - Title text (only shown for poster widget)
- `description` (optional) - Description text (only shown for poster widget)

## Configuration

### Autofiller Configuration

The autofiller automatically fills form fields when users log in via the Login Widget. Update the selectors to match your form field `name` attributes:

```javascript
// In PremagicService.js
const DEFAULT_AUTOFILLER_CONFIG = {
  enabled: true,
  selectors: {
    firstName: "[name='firstName']",        // Maps to <input name="firstName">
    lastName: "[name='lastName']",          // Maps to <input name="lastName">
    email: "[name='emailId']",             // Maps to <input name="emailId">
    companyName: "[name='companyName']",   // Maps to <input name="companyName">
    role: "[name='jobTitle']",             // Maps to <input name="jobTitle">
    phone: "[name='phone']",               // Maps to <input name="phone">
    countryCode: "[name='countryCode']",   // Maps to <input name="countryCode">
    // ... more selectors
  }
};
```

**Important**: The selectors must match your HTML form field `name` attributes exactly.

## Troubleshooting

### Widget Not Appearing?

1. **Check browser console** for errors
2. **Verify configuration** - All IDs in `DEFAULT_CONFIG` must be correct
3. **Check container exists** - The `PremagicWidget` component creates it automatically
4. **Verify script loading** - Check Network tab in DevTools for `premagic-poster-widget.js`

### Form Autofill Not Working?

1. **Check selectors** - `autofillerConfig.selectors` must match your form field `name` attributes exactly
2. **Verify enabled** - Ensure `autofillerConfig.enabled` is `true`
3. **Check widget initialization** - Make sure `initLoginWidget()` is called in `useEffect`

### Widget Not Re-initializing When Navigating Back?

1. **Check cleanup** - The `PremagicWidget` component should automatically unmount on cleanup
2. **Check browser console** - Look for "LoaderObject" errors
3. **Verify React DevTools** - Ensure component is properly unmounting/remounting

### "Widget didn't find LoaderObject" Error?

This error means the widget script executed before the queue was initialized. This should be handled automatically, but if you see it:

1. **Check imports** - Ensure `PremagicService.js` is imported correctly
2. **Don't modify `window._hw`** - Don't manually set or modify `window._hw` before widget initialization
3. **Check timing** - Ensure `initLoginWidget()` or `initPosterCreatorWidget()` is called in `useEffect`, not during render

## Example Project Structure

```
your-react-app/
├── public/
│   └── index.html          # Add Premagic tracking scripts here
├── src/
│   ├── premagic-widgets/
│   │   ├── PremagicService.js  # Widget service (configure here)
│   │   └── PremagicWidget.js   # React component wrapper
│   ├── pages/
│   │   ├── RegistrationPage.js  # Use Login Widget here
│   │   └── SuccessPage.js       # Use Poster Widget here
│   └── ...
└── package.json
```

## Advanced Usage

### Custom Configuration Per Widget

You can override the default configuration for each widget:

```javascript
// Login widget with custom redirect
initLoginWidget({
  redirectUrl: "/dashboard",
  autofillerConfig: {
    enabled: true,
    selectors: {
      email: "[name='userEmail']",  // Custom selector
      // ... other selectors
    }
  }
});

// Poster widget for speakers
initPosterCreatorWidget({
  type: "SPEAKER",
  widgetStyle: "preview"
});
```

### Styling the Widget Container

Add custom CSS classes to the widget container:

```jsx
<PremagicWidget 
  variant="poster"
  containerClassName="my-custom-class"
/>
```

Then style it in your CSS:

```css
.my-custom-class {
  margin: 20px 0;
  padding: 20px;
}
```

## Support

For issues related to:
- **Premagic Widgets**: Contact Premagic support
- **Integration Questions**: Refer to this documentation

## Technical Details

### How Re-initialization Works

When you navigate away from a page and come back:

1. **Component unmounts** → `PremagicWidget` cleanup calls `unmountWidget()`
2. **Cleanup happens** → Widget state, script elements, and window objects are cleaned up
3. **Component remounts** → Widget re-initializes with fresh state
4. **Cache-busting** → Script URL includes timestamp to force ES module re-execution

This ensures widgets always work correctly when navigating between pages.

### Script Loading

The Premagic widget script is loaded dynamically:
- Uses cache-busting (timestamp parameter) for re-initialization
- Handles cases where script is already loaded
- Uses ES module type for optimal performance
- Queue system ensures init calls work whether script is loaded or not
