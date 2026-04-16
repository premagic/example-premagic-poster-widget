# CLAUDE.md

> Context file for AI assistants working in this repository.

## What is this repo?

Sample apps demonstrating **Premagic widget integration** into event registration flows. Three independent framework samples (React, Angular, Vue) live side-by-side, each implementing the same 4-page flow with identical UX. This is a reference/demo repo -- not a library or package to be published.

## Repository structure

```
├── react/          # React 18 + Create React App + React Router v6
├── angular/        # Angular 17+ standalone components + Angular Router
├── vue/            # Vue 3 + Vite + Vue Router v4
├── LLM_GUIDE.md    # Root integration guide (all features, all frameworks)
├── README.md       # User-facing docs
└── CLAUDE.md       # This file
```

Each framework folder is fully self-contained with its own `package.json`, styles, and pages. They share no code at build time -- changes to one do not affect the others.

### Per-framework layout (same in all three)

```
<framework>/
├── src/
│   ├── pages/
│   │   ├── EventPage         # Ticket selection (route: /register/select)
│   │   ├── RegistrationPage  # LoginWidget + registration form (route: /register/form)
│   │   ├── SuccessPage       # PosterWidget for poster creation (route: /register/success)
│   │   └── ProfilePage       # PosterWidget with prefillData, no login (route: /profile)
│   ├── components/
│   │   └── RegistrationForm  # Reusable form fields
│   └── premagic-widgets/
│       ├── LoginWidget       # Wraps Premagic login/LinkedIn auth
│       └── PosterWidget      # Wraps Premagic poster creator
├── LLM_GUIDE.md              # Framework-specific component code for AI assistants
└── package.json
```

## Quick start

```bash
# React
cd react && npm install && npm start        # http://localhost:3000

# Angular
cd angular && npm install && npm start      # http://localhost:4200

# Vue
cd vue && npm install && npm run dev        # http://localhost:5173
```

## Key conventions

### Cross-framework consistency
- **All three frameworks must stay in sync.** When adding a feature, component, page, route, or style, apply the equivalent change to React, Angular, and Vue.
- CSS class names, page structure, and visual design are identical across frameworks. Each framework has its own `styles.css` with the same rules.
- Routes are the same: `/register/select`, `/register/form`, `/register/success`, `/profile`. Root `/` redirects to `/register/select`.

### Premagic widget config
```js
{
  shareId: "...",           // Required -- the only config key
}
```

### Styling (Vitaly Friedman design principles)
- Global styles in each framework's `src/styles.css`.
- **No CSS-in-JS, no Tailwind, no CSS modules** -- plain CSS only.
- Clean, content-first design: off-white backgrounds (`#f8f9fb`), white cards with subtle borders (`1px solid #e5e7eb`) and minimal shadows.
- Accent color: `#667eea` used sparingly for interactive elements, focus rings, and active states -- not as page backgrounds.
- WCAG AA+ contrast: primary text `#1f2937`, secondary text `#4b5563`, muted text `#6b7280`.
- Typography: system font stack, `font-weight: 800` for headings, no `text-shadow`.
- Buttons: solid `background: #667eea`, `border-radius: 8px`, `min-height: 48px` (touch target). No gradients, no pill shapes, no transform effects.
- Cards: `border-radius: 12px`, `border: 1px solid #e5e7eb`, subtle `box-shadow`. Selected state uses left accent border.
- Forms: `min-height: 48px` inputs, `border: 1.5px solid #d1d5db`, visible `:focus-visible` outlines on all interactive elements.
- Spacing: 4px/8px rhythm (0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem).
- BEM-ish flat class names (e.g. `.main-header-nav-item`, `.ticket-card`).

### Routing
- React: `react-router-dom` v6 with `<BrowserRouter>` in `index.js`, `<Routes>` in `App.js`.
- Angular: standalone route config in `app.routes.ts`, `<router-outlet>` in `AppComponent`.
- Vue: `vue-router` v4 configured in `src/router/index.js`, `<router-view>` in `App.vue`.

### Data flow
- Ticket selection passes data via router state (soft navigation) and `sessionStorage` (hard navigation fallback).
- Registration data stored in `sessionStorage` for cross-page persistence.

### Widget lifecycle
- Widgets load the Premagic script dynamically with retry logic (up to 10 retries).
- Widgets call `window.premagic("unmount")` on component teardown.
- Autofill sync uses polling to detect values injected by the LoginWidget into form fields.

## Do NOT

- Add `projectId`, `eventId`, `websiteId`, or `domain` to any widget config -- all have been removed.
- Install CSS frameworks (Tailwind, Bootstrap, etc.) -- keep plain CSS.
- Share code across framework folders at build time -- each is independent.
- Add new dependencies unless strictly necessary -- these are minimal sample apps.

## LLM_GUIDE.md files

- `LLM_GUIDE.md` (root): Full integration reference covering all 3 Premagic features with config details.
- `react/LLM_GUIDE.md`: Ready-to-copy React component code.
- `angular/LLM_GUIDE.md`: Ready-to-copy Angular component code.
- `vue/LLM_GUIDE.md`: Ready-to-copy Vue component code.

These are maintained as reference docs for AI coding assistants integrating Premagic into other projects.
