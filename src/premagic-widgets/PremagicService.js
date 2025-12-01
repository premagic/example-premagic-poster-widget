/**
 * PREMAGIC SERVICE
 * 
 * This service handles all Premagic widget initialization and script loading.
 * It uses the exact script loading pattern from Premagic's official snippets.
 * 
 * IMPORTANT: Update the default configuration values below with your actual Premagic credentials:
 * - shareId: Your Premagic share ID
 * - projectId: Your Premagic project ID
 * - eventId: Your Premagic event ID
 * - websiteId: Your Premagic website ID
 * - domain: Your Premagic domain
 * 
 * Usage:
 *   import { initLoginWidget, initPosterCreatorWidget } from '../premagic-widgets/PremagicService';
 *   
 *   // Initialize login widget (in RegistrationPage)
 *   initLoginWidget();
 *   
 *   // Or with custom config
 *   initLoginWidget({
 *     shareId: "YOUR_SHARE_ID",
 *     projectId: "YOUR_PROJECT_ID",
 *     // ... other config
 *   });
 *   
 *   // Initialize poster creator widget (in SuccessPage)
 *   initPosterCreatorWidget();
 */

const PM_URL = 'https://asts.premagic.com/s/poster-widget/premagic-poster-widget.js';

/**
 * Default Premagic configuration values
 * ⚠️ REPLACE these with your actual Premagic credentials
 * 
 * These values are used as fallbacks if not provided when calling init methods.
 * You can override any of these by passing them in the config parameter.
 */
const DEFAULT_CONFIG = {
  shareId: "AI-everything-Egypt",              // ⚠️ REPLACE: Your share ID
  projectId: "e8NkvbWmTxc",                     // ⚠️ REPLACE: Your project ID
  eventId: "0a9b5b6e-b303-46cc-b48c-4b62c4e0f011", // ⚠️ REPLACE: Your event ID
  websiteId: "ai-everything-egypt",            // ⚠️ REPLACE: Your website ID
  domain: "aieverything",                       // ⚠️ REPLACE: Your domain
};

/**
 * Default autofiller configuration
 * 
 * This configuration maps Premagic fields to your HTML form field selectors.
 * Update the selectors to match your form field 'name' attributes exactly.
 * 
 * Example: If your form uses <input name="userFirstName"> instead of <input name="firstName">,
 * change "firstName": "[name='firstName']" to "firstName": "[name='userFirstName']"
 * 
 * To disable autofill, set enabled: false
 */
const DEFAULT_AUTOFILLER_CONFIG = {
  enabled: true,
  selectors: {
    firstName: "[name='firstName']",          // Maps to <input name="firstName">
    lastName: "[name='lastName']",            // Maps to <input name="lastName">
    fullName: "[name='fullName']",           // Maps to <input name="fullName">
    companyName: "[name='companyName']",     // Maps to <input name="companyName">
    role: "[name='jobTitle']",               // Maps to <input name="jobTitle">
    photo: "[name='photo']",                  // Maps to <input name="photo">
    linkedinProfile: "[name='linkedinProfile']", // Maps to <input name="linkedinProfile">
    email: "[name='emailId']",                // Maps to <input name="emailId">
    emailConfirmation: "[name='emailIdConfirmation']", // Maps to <input name="emailIdConfirmation">
    countryCode: "[name='countryCode']",     // Maps to <input name="countryCode">
    phone: "[name='phone']"                  // Maps to <input name="phone">
  }
};

/**
 * Load the Premagic widget script using the exact pattern from Premagic snippets
 * 
 * This function uses an IIFE (Immediately Invoked Function Expression) pattern
 * that matches Premagic's official implementation. It:
 * 1. Creates a queue function (_hw) if it doesn't exist
 * 2. Creates and loads the script element
 * 3. Inserts it into the DOM
 * 
 * The script is loaded with defer and module type for optimal performance.
 */
function loadScript() {
  // Check if script is already loaded to avoid duplicate loading
  if (document.getElementById('_hw') || window._hw) {
    return;
  }

  /**
   * Use the exact IIFE pattern from Premagic snippets
   * This ensures compatibility with Premagic's widget system
   * 
   * Parameters:
   * - w: window object
   * - d: document object
   * - s: script tag name
   * - o: function name (_hw)
   * - f: PM_URL (not used in function but kept for compatibility)
   * - js: script element variable
   * - fjs: first script element variable
   */
  (function (w, d, s, o, f, js, fjs) {
    // Initialize widget function queue if it doesn't exist
    // This allows calls to _hw() before the script loads
    w[o] = w[o] || function () {
      (w[o].q = w[o].q || []).push(arguments);
    };
    
    // Create script element
    js = d.createElement(s);
    fjs = d.getElementsByTagName(s)[0];
    
    // Set script attributes
    js.id = o;                    // Set ID to "_hw"
    js.src = PM_URL;              // Premagic widget script URL
    js.defer = 1;                 // Defer loading
    js.type = 'module';           // ES module type
    
    // Insert script into DOM
    // Try to insert before first script, otherwise append to head
    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    } else {
      d.head.appendChild(js);
    }
  })(window, document, "script", "_hw", PM_URL);
}

/**
 * Initialize widget with given configuration
 * 
 * This function loads the script (if needed) and initializes the widget
 * with the provided configuration. It handles the case where _hw
 * might not be ready yet by using the queue system.
 * 
 * @param {Object} config - Premagic widget configuration object
 */
function initWidget(config) {
  // Load script first (will return early if already loaded)
  loadScript();
  
  // Initialize widget immediately
  // If _hw is not ready yet, the queue system will handle it
  if (window._hw) {
    window._hw("init", config);
  } else {
    // Initialize queue function if it doesn't exist
    // This ensures init calls are queued until script loads
    window._hw = window._hw || function () {
      (window._hw.q = window._hw.q || []).push(arguments);
    };
    // Queue the init call
    window._hw("init", config);
  }
}

export function unmountWidget() {
  if (window._hw && typeof window._hw === 'function') {
    window._hw("unmount");
  }
  window._hw = null;
  if (document.getElementById('_hw')) {
    document.getElementById('_hw').remove();
  }
}

/**
 * Initialize the Premagic Login Widget (for registration forms)
 * 
 * This widget allows users to quickly log in and auto-fill the registration form.
 * It should be used on the registration page before the form.
 * 
 * The widget will:
 * - Show a login interface for quick authentication
 * - Auto-fill form fields based on autofillerConfig.selectors
 * - Handle user authentication flow
 * 
 * @param {Object} config - Optional configuration object to override defaults
 * @param {string} [config.shareId] - Premagic share ID (defaults to DEFAULT_CONFIG.shareId)
 * @param {string} [config.projectId] - Premagic project ID (defaults to DEFAULT_CONFIG.projectId)
 * @param {string} [config.eventId] - Premagic event ID (defaults to DEFAULT_CONFIG.eventId)
 * @param {string} [config.websiteId] - Premagic website ID (defaults to DEFAULT_CONFIG.websiteId)
 * @param {string} [config.domain] - Premagic domain (defaults to DEFAULT_CONFIG.domain)
 * @param {string} [config.redirectUrl] - Optional redirect URL after login (defaults to "")
 * @param {Object} [config.autofillerConfig] - Autofiller configuration (defaults to DEFAULT_AUTOFILLER_CONFIG)
 * 
 * @example
 * // Use default config
 * initLoginWidget();
 * 
 * // Override specific values
 * initLoginWidget({
 *   shareId: "custom-share-id",
 *   redirectUrl: "/custom-redirect"
 * });
 */
export function initLoginWidget(config = {}) {
  const PM_config = {
    shareId: config.shareId || DEFAULT_CONFIG.shareId,
    projectId: config.projectId || DEFAULT_CONFIG.projectId,
    eventId: config.eventId || DEFAULT_CONFIG.eventId,
    websiteId: config.websiteId || DEFAULT_CONFIG.websiteId,
    domain: config.domain || DEFAULT_CONFIG.domain,
    embedWidgetFlow: "registration",  // Must be "registration" for login widget
    redirectUrl: config.redirectUrl || "",
    autofillerConfig: config.autofillerConfig || DEFAULT_AUTOFILLER_CONFIG
  };

  initWidget(PM_config);
}

/**
 * Initialize the Premagic Poster Creator Widget (for success/confirmation pages)
 * 
 * This widget allows registered attendees to create and share event posters.
 * It should be used on the registration success/confirmation page.
 * 
 * The widget will:
 * - Display a poster creation interface
 * - Allow users to customize event posters
 * - Enable sharing functionality
 * 
 * @param {Object} config - Optional configuration object to override defaults
 * @param {string} [config.shareId] - Premagic share ID (defaults to DEFAULT_CONFIG.shareId)
 * @param {string} [config.projectId] - Premagic project ID (defaults to DEFAULT_CONFIG.projectId)
 * @param {string} [config.eventId] - Premagic event ID (defaults to DEFAULT_CONFIG.eventId)
 * @param {string} [config.websiteId] - Premagic website ID (defaults to DEFAULT_CONFIG.websiteId)
 * @param {string} [config.domain] - Premagic domain (defaults to DEFAULT_CONFIG.domain)
 * @param {string} [config.type] - Widget type (defaults to "ATTENDEE")
 * @param {string} [config.widgetStyle] - Widget style (defaults to "preview")
 * 
 * @example
 * // Use default config
 * initPosterCreatorWidget();
 * 
 * // Override specific values
 * initPosterCreatorWidget({
 *   shareId: "custom-share-id",
 *   type: "SPEAKER"
 * });
 */
export function initPosterCreatorWidget(config = {}) {
  const PM_config = {
    shareId: config.shareId || DEFAULT_CONFIG.shareId,
    projectId: config.projectId || DEFAULT_CONFIG.projectId,
    eventId: config.eventId || DEFAULT_CONFIG.eventId,
    websiteId: config.websiteId || DEFAULT_CONFIG.websiteId,
    domain: config.domain || DEFAULT_CONFIG.domain,
    embedWidgetFlow: "poster_creation",  // Must be "poster_creation" for poster widget
    type: config.type || "ATTENDEE",
    widgetStyle: config.widgetStyle || "preview"
  };

  initWidget(PM_config);
}
