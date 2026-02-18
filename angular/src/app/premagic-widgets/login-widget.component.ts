import { Component, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * PREMAGIC LOGIN WIDGET
 *
 * Simple component for Premagic login widget. Just copy, paste, and pass your config.
 *
 * @example
 * <app-login-widget [config]="{
 *   shareId: 'YOUR_SHARE_ID',
 *   websiteId: 'YOUR_WEBSITE_ID',   // DEPRECATED: will be removed in Q2 2026
 *   domain: 'YOUR_DOMAIN'           // DEPRECATED: will be removed in Q2 2026
 * }" />
 */

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
  window.premagic = window.premagic || function () { (window.premagic.q = window.premagic.q || []).push(arguments); };

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
      flex: 1;
      height: 40px;
      width: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 16px;
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
