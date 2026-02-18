# Premagic Integration Guide -- React

> React-specific components and usage examples for Premagic widgets.
> For the full integration reference (all 3 features, config details, tracking), see the [root LLM_GUIDE.md](../LLM_GUIDE.md).

## Quick Start

```bash
# This project uses React 18 with react-scripts (Create React App)
cd react
npm install
npm start
```

---

## LoginWidget Component

Copy this file into your project (e.g., `src/premagic-widgets/LoginWidget.js`):

```jsx
import React, { useEffect, useRef } from 'react';

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

export default function LoginWidget({ config }) {
  const elementRef = useRef(null);
  const elementId = 'widget-premagic';

  useEffect(() => {
    if (!config) {
      console.warn('LoginWidget: config prop is required');
      return;
    }

    const PM_config = {
      shareId: config.shareId,
      websiteId: config.websiteId,   // DEPRECATED: will be removed in Q2 2026
      domain: config.domain,         // DEPRECATED: will be removed in Q2 2026
      embedWidgetFlow: "registration",
      redirectUrl: config.redirectUrl || "",
      autofillerConfig: config.autofillerConfig || { enabled: true }
    };

    setTimeout(() => {
      initWidget(PM_config, elementId);
    }, 0);

    return unmountWidget;
  }, [config]);

  return (
    <div>
      <div id={elementId} ref={elementRef}>
        <div style={{ margin: 'auto', width: '200px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="premagic-widget-loading-sk"></div>
            <div className="premagic-widget-loading-sk"></div>
          </div>
        </div>
      </div>
      <style>{`
        .premagic-widget-loading-sk {
          flex: 1; height: 40px; width: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%; border-radius: 16px;
          animation: premagic-shimmer 1.5s infinite;
        }
        @keyframes premagic-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
```

### Usage

```jsx
import LoginWidget from './premagic-widgets/LoginWidget';

function RegistrationPage() {
  const premagicConfig = {
    shareId: "YOUR_SHARE_ID",
    websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026
    domain: "YOUR_DOMAIN",          // DEPRECATED: will be removed in Q2 2026
  };

  return (
    <div>
      <h1>Register</h1>
      <LoginWidget config={premagicConfig} />
      {/* Your registration form below */}
    </div>
  );
}
```

---

## PosterWidget Component

Copy this file into your project (e.g., `src/premagic-widgets/PosterWidget.js`):

```jsx
import React, { useEffect, useRef } from 'react';

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

export default function PosterWidget({ config }) {
  const elementRef = useRef(null);
  const elementId = 'widget-premagic';

  useEffect(() => {
    if (!config) {
      console.warn('PosterWidget: config prop is required');
      return;
    }

    const PM_config = {
      shareId: config.shareId,
      websiteId: config.websiteId,   // DEPRECATED: will be removed in Q2 2026
      domain: config.domain,         // DEPRECATED: will be removed in Q2 2026
      embedWidgetFlow: "poster_creation",
      type: config.type || "ATTENDEE",
      widgetStyle: config.widgetStyle || "preview"
    };

    setTimeout(() => {
      initWidget(PM_config, elementId);
    }, 0);

    return unmountWidget;
  }, [config]);

  return (
    <div>
      <div id={elementId} ref={elementRef}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', margin: 'auto', width: '400px' }}>
          <div className="premagic-widget-loading-sk" style={{ height: '300px' }}></div>
          <div style={{ height: '16px' }}></div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="premagic-widget-loading-sk"></div>
          </div>
        </div>
      </div>
      <style>{`
        .premagic-widget-loading-sk {
          flex: 1; height: 40px; width: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%; border-radius: 16px;
          animation: premagic-shimmer 1.5s infinite;
        }
        @keyframes premagic-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
```

### Usage

```jsx
import PosterWidget from './premagic-widgets/PosterWidget';

function SuccessPage() {
  const premagicConfig = {
    shareId: "YOUR_SHARE_ID",
    websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026
    domain: "YOUR_DOMAIN",          // DEPRECATED: will be removed in Q2 2026
  };

  return (
    <div>
      <h1>Registration Successful!</h1>
      <PosterWidget config={premagicConfig} />
    </div>
  );
}
```

---

## PosterWidget with Pre-filled Data (No LoginWidget)

When you already have user data from your own auth system and don't need the LinkedIn login (LoginWidget), pass a `prefillData` object to the PosterWidget config to pre-populate the poster with attendee details. This is ideal for attendee profile pages, post-purchase confirmation, or exhibitor dashboards.

```jsx
import PosterWidget from './premagic-widgets/PosterWidget';

function ProfilePage({ user }) {
  const premagicConfig = {
    shareId: "YOUR_SHARE_ID",
    websiteId: "YOUR_WEBSITE_ID",   // DEPRECATED: will be removed in Q2 2026
    domain: "YOUR_DOMAIN",          // DEPRECATED: will be removed in Q2 2026
    prefillData: {
      externalId: user.id,                // External user ID from your system (optional)
      userName: user.name,                // Full name (optional)
      userTitle: user.jobTitle,           // Job title or role (optional)
      userCompany: user.company,          // Company name (optional)
      userPhoto: user.avatarUrl,          // URL to profile photo (optional)
      email: user.email,                  // Email address (optional)
      phone: user.phone,                  // Phone number (optional)
      registrationId: user.regId,         // Registration ID (optional)
      sessionTitle: "Conference 2025",    // Session or event title (optional)
      exhibitorLogo: user.companyLogo,    // URL to exhibitor logo (optional)
      exhibitorBoothNumber: user.booth,   // Booth number (optional)
    }
  };

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <PosterWidget config={premagicConfig} />
    </div>
  );
}
```

See the [root LLM_GUIDE.md](../LLM_GUIDE.md#prefilldata-reference) for the full prefillData field reference. A working example is in `src/pages/ProfilePage.js`.

---

## Advocate Revenue Tracking (React)

This feature is framework-agnostic (plain JS), but here is how to call it in a React component:

```jsx
import { useEffect } from 'react';

function CheckoutSuccessPage({ orderId, orderCount, totalValue, currency }) {
  useEffect(() => {
    // Call after payment is confirmed
    window.AdvocateTracking.trackPurchase({
      orderId: orderId,
      orderCount: orderCount,
      value: totalValue,
      currency: currency  // ISO 4217: 'USD', 'EUR', 'GBP', etc.
    });
  }, []);

  return <h1>Payment Successful!</h1>;
}
```

See the [root LLM_GUIDE.md](../LLM_GUIDE.md#feature-3-advocate-revenue-tracking) for full parameter details and notes.
