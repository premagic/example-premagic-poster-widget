# Premagic Integration Guide -- Angular

> Angular 17+ standalone component code and usage examples for Premagic widgets.
> For the full integration reference (all 3 features, config details, tracking), see the [root LLM_GUIDE.md](../LLM_GUIDE.md).

## Quick Start

```bash
# This project uses Angular 17+ with standalone components
cd angular
npm install
npx ng serve
```

---

## LoginWidgetComponent

Copy this file into your project (e.g., `src/app/premagic-widgets/login-widget.component.ts`):

```typescript
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

declare global {
  interface Window {
    premagic: any;
  }
}

const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js';

function loadScript(): void {
  if (document.getElementById('premagic') || window.premagic) return;
  (function (w: any, d: Document, s: string, o: string, f: string, js?: any, fjs?: any) {
    w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments); };
    js = d.createElement(s); fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = PM_URL; js.defer = 1; js.type = 'module';
    (fjs?.parentNode ? fjs.parentNode.insertBefore(js, fjs) : d.head.appendChild(js));
  })(window, document, 'script', 'premagic', PM_URL);
}

function initWidget(config: any, elementId: string, retryCount = 0): void {
  loadScript();
  window.premagic = window.premagic || function () {
    (window.premagic.q = window.premagic.q || []).push(arguments);
  };
  const element = document.getElementById(elementId);
  if (element) {
    window.premagic('init', config);
  } else if (retryCount < 10) {
    setTimeout(() => initWidget(config, elementId, retryCount + 1), 10);
  }
}

function unmountWidget(): void {
  if (window.premagic && typeof window.premagic === 'function') {
    window.premagic('unmount');
  }
}

@Component({
  selector: 'app-login-widget',
  standalone: true,
  template: `
    <div>
      <div id="widget-premagic">
        <div style="margin: auto; width: 200px;">
          <div style="display: flex; gap: 16px;">
            <div class="premagic-widget-loading-sk"></div>
            <div class="premagic-widget-loading-sk"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
  `],
})
export class LoginWidgetComponent implements OnInit, OnDestroy {
  @Input() config: any;

  private readonly elementId = 'widget-premagic';

  ngOnInit(): void {
    if (!this.config) {
      console.warn('LoginWidget: config input is required');
      return;
    }

    const pmConfig = {
      shareId: this.config.shareId,
      websiteId: this.config.websiteId,   // DEPRECATED: will be removed in Q2 2026
      domain: this.config.domain,         // DEPRECATED: will be removed in Q2 2026
      embedWidgetFlow: 'registration',
      redirectUrl: this.config.redirectUrl || '',
      autofillerConfig: this.config.autofillerConfig || { enabled: true },
    };

    setTimeout(() => {
      initWidget(pmConfig, this.elementId);
    }, 0);
  }

  ngOnDestroy(): void {
    unmountWidget();
  }
}
```

### Usage

```typescript
import { Component } from '@angular/core';
import { LoginWidgetComponent } from './premagic-widgets/login-widget.component';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [LoginWidgetComponent],
  template: `
    <h1>Register</h1>
    <app-login-widget [config]="premagicConfig" />
    <!-- Your registration form below -->
  `,
})
export class RegistrationPageComponent {
  premagicConfig = {
    shareId: 'YOUR_SHARE_ID',
    websiteId: 'YOUR_WEBSITE_ID',   // DEPRECATED: will be removed in Q2 2026
    domain: 'YOUR_DOMAIN',          // DEPRECATED: will be removed in Q2 2026
  };
}
```

---

## PosterWidgetComponent

Copy this file into your project (e.g., `src/app/premagic-widgets/poster-widget.component.ts`):

```typescript
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js';

function loadScript(): void {
  if (document.getElementById('premagic') || (window as any).premagic) return;
  (function (w: any, d: Document, s: string, o: string, f: string, js?: any, fjs?: any) {
    w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments); };
    js = d.createElement(s); fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = PM_URL; js.defer = 1; js.type = 'module';
    (fjs?.parentNode ? fjs.parentNode.insertBefore(js, fjs) : d.head.appendChild(js));
  })(window, document, 'script', 'premagic', PM_URL);
}

function initWidget(config: any, elementId: string, retryCount = 0): void {
  loadScript();
  (window as any).premagic = (window as any).premagic || function () {
    ((window as any).premagic.q = (window as any).premagic.q || []).push(arguments);
  };
  const element = document.getElementById(elementId);
  if (element) {
    (window as any).premagic('init', config);
  } else if (retryCount < 10) {
    setTimeout(() => initWidget(config, elementId, retryCount + 1), 10);
  }
}

function unmountWidget(): void {
  if ((window as any).premagic && typeof (window as any).premagic === 'function') {
    (window as any).premagic('unmount');
  }
}

@Component({
  selector: 'app-poster-widget',
  standalone: true,
  template: `
    <div>
      <div id="widget-premagic">
        <div style="background: #fff; border-radius: 16px; padding: 16px; margin: auto; width: 400px;">
          <div class="premagic-widget-loading-sk" style="height: 300px;"></div>
          <div style="height: 16px;"></div>
          <div style="display: flex; gap: 16px;">
            <div class="premagic-widget-loading-sk"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
  `],
})
export class PosterWidgetComponent implements OnInit, OnDestroy {
  @Input() config: any;

  private readonly elementId = 'widget-premagic';

  ngOnInit(): void {
    if (!this.config) {
      console.warn('PosterWidget: config input is required');
      return;
    }

    const pmConfig = {
      shareId: this.config.shareId,
      websiteId: this.config.websiteId,   // DEPRECATED: will be removed in Q2 2026
      domain: this.config.domain,         // DEPRECATED: will be removed in Q2 2026
      embedWidgetFlow: 'poster_creation',
      type: this.config.type || 'ATTENDEE',
      widgetStyle: this.config.widgetStyle || 'preview',
    };

    setTimeout(() => {
      initWidget(pmConfig, this.elementId);
    }, 0);
  }

  ngOnDestroy(): void {
    unmountWidget();
  }
}
```

### Usage

```typescript
import { Component } from '@angular/core';
import { PosterWidgetComponent } from './premagic-widgets/poster-widget.component';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [PosterWidgetComponent],
  template: `
    <h1>Registration Successful!</h1>
    <app-poster-widget [config]="premagicConfig" />
  `,
})
export class SuccessPageComponent {
  premagicConfig = {
    shareId: 'YOUR_SHARE_ID',
    websiteId: 'YOUR_WEBSITE_ID',   // DEPRECATED: will be removed in Q2 2026
    domain: 'YOUR_DOMAIN',          // DEPRECATED: will be removed in Q2 2026
  };
}
```

---

## Advocate Revenue Tracking (Angular)

This feature is framework-agnostic (plain JS), but here is how to call it in an Angular component:

```typescript
import { Component, OnInit } from '@angular/core';

declare var AdvocateTracking: any;

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  template: `<h1>Payment Successful!</h1>`,
})
export class CheckoutSuccessComponent implements OnInit {
  ngOnInit(): void {
    // Call after payment is confirmed
    (window as any).AdvocateTracking.trackPurchase({
      orderId: '12345',
      orderCount: 2,
      value: 100.00,
      currency: 'USD'  // ISO 4217: 'USD', 'EUR', 'GBP', etc.
    });
  }
}
```

See the [root LLM_GUIDE.md](../LLM_GUIDE.md#feature-3-advocate-revenue-tracking) for full parameter details and notes.
