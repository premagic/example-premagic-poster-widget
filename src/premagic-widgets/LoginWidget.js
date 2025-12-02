import React, { useEffect } from 'react';

/**
 * PREMAGIC LOGIN WIDGET
 * 
 * Simple component for Premagic login widget. Just copy, paste, and pass your config.
 * 
 * @example
 * <LoginWidget config={{
 *   shareId: "YOUR_SHARE_ID",
 *   projectId: "YOUR_PROJECT_ID",
 *   eventId: "YOUR_EVENT_ID",
 *   websiteId: "YOUR_WEBSITE_ID",
 *   domain: "YOUR_DOMAIN"
 * }} />
 */

const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js';

function loadScript() {
  if (document.getElementById('premagic') || window.premagic) return;
  (function(w,d,s,o,f,js,fjs){w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];js.id=o;js.src=PM_URL;js.defer=1;js.type='module';(fjs?.parentNode?fjs.parentNode.insertBefore(js,fjs):d.head.appendChild(js));})(window,document,"script","premagic",PM_URL);
}

function initWidget(config) {
  loadScript();
  window.premagic = window.premagic || function () { (window.premagic.q = window.premagic.q || []).push(arguments); };
  window.premagic("init", config);
}

function unmountWidget() {
  if (window.premagic && typeof window.premagic === 'function') {
    window.premagic("unmount");
  }
  window.premagic = null;
  document.getElementById('premagic')?.remove();
}

export default function LoginWidget({ config }) {
  useEffect(() => {
    if (!config) {
      console.warn('LoginWidget: config prop is required');
      return;
    }

    const PM_config = {
      shareId: config.shareId,
      projectId: config.projectId,
      eventId: config.eventId,
      websiteId: config.websiteId,
      domain: config.domain,
      embedWidgetFlow: "registration",
      redirectUrl: config.redirectUrl || "",
      autofillerConfig: config.autofillerConfig || { enabled: true }
    };

    initWidget(PM_config);
    return () => unmountWidget();
  }, [config]);

  return (
    <div>
      <div id="premagic-poster-creator-widget-root">
        <div style={{ margin: 'auto', width: '200px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="premagic-widget-loading-sk"></div>
            <div className="premagic-widget-loading-sk"></div>
          </div>
        </div>
      </div>
      <style>{`
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
      `}</style>
    </div>
  );
}
