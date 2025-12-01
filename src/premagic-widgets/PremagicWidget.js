import React, { useEffect } from 'react';
import { unmountWidget } from './PremagicService';

/**
 * PREMAGIC WIDGET COMPONENT
 * 
 * Reusable component for displaying Premagic widgets with loading skeleton.
 * Handles widget cleanup (unmount) when component unmounts.
 * 
 * @param {string} variant - Widget variant: 'login' or 'poster'
 * @param {string} containerClassName - Optional CSS class for the container
 * @param {string} title - Optional title for poster widget
 * @param {string} description - Optional description for poster widget
 */
const PremagicWidget = ({
  variant = 'login',
  containerClassName = '',
  title = '',
  description = ''
}) => {
  /**
   * Cleanup: Unmount widget when component unmounts
   * This ensures proper cleanup when navigating away from the page,
   * allowing the widget to re-initialize correctly when coming back.
   */
  useEffect(() => {
    return () => {
      unmountWidget();
    };
  }, []);

  const isPoster = variant === 'poster';
  const containerClass = isPoster
    ? `premagic-poster-container ${containerClassName}`.trim()
    : `premagic-widget-container ${containerClassName}`.trim();

  return (
    <div className={containerClass}>
      {isPoster && title && <h2>{title}</h2>}
      {isPoster && description && (
        <p className="poster-description">{description}</p>
      )}

      <div id="premagic-poster-creator-widget-root">
        {isPoster ? (
          // Poster widget loading skeleton
          <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', margin: 'auto', width: '400px' }}>
            <div className="premagic-widget-loading-sk" style={{ height: '300px' }}></div>
            <div style={{ height: '16px' }}></div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="premagic-widget-loading-sk"></div>
            </div>
          </div>
        ) : (
          // Login widget loading skeleton
          <div style={{ margin: 'auto', width: '200px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="premagic-widget-loading-sk"></div>
              <div className="premagic-widget-loading-sk"></div>
            </div>
          </div>
        )}
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
};

export default PremagicWidget;

