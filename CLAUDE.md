# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev           # Start Vite dev server (http://localhost:4500)
npm run dev:vercel    # Run with Vercel dev environment
npm run build         # Production build
npm run preview       # Preview production build
npm run deploy        # Deploy to Vercel production
```

Requires Node.js v20+ (use `nvm use` to switch via .nvmrc).

## Architecture

React 19 SPA with React Router v7, built with Vite and TypeScript.

**Routes:**
- `/` - Main portfolio (Hero, Projects, About, Skills, Contact)
- `/moviewatcht` - MovieWatcht app landing page
- `/ai` - Daniel AI service page
- `/ai/privacy-policy`, `/ai/terms-of-service` - AI legal pages
- `/privacy` - Privacy policy

**Key patterns:**
- Projects component is lazy-loaded on Home with React Suspense
- Navigation and Hero components use `React.memo()` for optimization
- HeroBackground sets CSS variables for dynamic hero backgrounds
- Overlay component shows 900ms page loader on initial load

## Styling

SASS with BEM-like naming (`navbar__logo`, `navbar__navigation--link`).

**Theme (src/scss/_variables.scss):**
- Background: `#1d1d1d`
- Navbar: `#181818`
- Accent: `#74f7d9` (cyan)
- Fonts: Roboto Mono (headings), Roboto (body)
- Max content width: 768px

## Code Conventions

1. Use named exports, not `export default` (unless absolutely needed)
2. Place styled-components below each function in the same file
3. No Tailwind - use SASS partials in `src/scss/partials/`
4. Path aliases: `src/` and `@/` both resolve to the src directory
