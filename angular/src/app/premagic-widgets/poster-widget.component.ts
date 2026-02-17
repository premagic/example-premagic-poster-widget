import { Component, Input, OnInit, OnDestroy } from '@angular/core';

/**
 * PREMAGIC POSTER WIDGET
 *
 * Simple component for Premagic poster creator widget. Just copy, paste, and pass your config.
 *
 * @example
 * <app-poster-widget [config]="{
 *   shareId: 'YOUR_SHARE_ID',
 *   websiteId: 'YOUR_WEBSITE_ID',   // DEPRECATED: will be removed in Q2 2026
 *   domain: 'YOUR_DOMAIN'           // DEPRECATED: will be removed in Q2 2026
 * }" />
 */

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
  (window as any).premagic = (window as any).premagic || function () { ((window as any).premagic.q = (window as any).premagic.q || []).push(arguments); };

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
