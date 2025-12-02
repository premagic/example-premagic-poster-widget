import React, { useEffect, useRef } from 'react';

/**
 * PREMAGIC POSTER WIDGET
 * 
 * Simple component for Premagic poster creator widget. Just copy, paste, and pass your config.
 * 
 * @example
 * <PosterWidget config={{
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

function initWidget(config, elementId, retryCount = 0) {
  loadScript();
  window.premagic = window.premagic || function () { (window.premagic.q = window.premagic.q || []).push(arguments); };

  const element = document.getElementById(elementId);
  if (element) {
    window.premagic("init", config);
  } else if (retryCount < 10) {
    // Retry up to 10 times (max 100ms wait)
    setTimeout(() => initWidget(config, elementId, retryCount + 1), 10);
  }
}

function unmountWidget() {
  if (window.premagic && typeof window.premagic === 'function') {
    window.premagic("unmount");
  }
  // Don't destroy window.premagic or remove script - allow re-initialization
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
      projectId: config.projectId,
      eventId: config.eventId,
      websiteId: config.websiteId,
      domain: config.domain,
      embedWidgetFlow: "poster_creation",
      type: config.type || "ATTENDEE",
      widgetStyle: config.widgetStyle || "preview"
    };

    // Small delay to ensure DOM is ready
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
