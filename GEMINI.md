# Portfolio Project Context

## Project Overview
This is a personal portfolio website built with **React 18**, **TypeScript**, and **Vite**. It features a responsive design, custom styling via SCSS, and routing using `react-router-dom`. The project is deployed on Vercel and may include serverless functions or an Express API integration.

## Prerequisites & Setup
- **Node.js:** Version 20.x (as specified in `.nvmrc` and `package.json`).
- **Package Manager:** `npm`.

### Setup
```bash
nvm use          # Switch to Node v20
npm install      # Install dependencies
```

## Key Commands
- **Development Server:**
  ```bash
  npm run dev
  ```
  Starts the local Vite server at `http://localhost:4500`.

- **Vercel Development (Local):**
  ```bash
  npm run dev:vercel
  ```
  Runs the project with Vercel configuration (useful for testing serverless functions/API).

- **Build for Production:**
  ```bash
  npm run build
  ```
  Generates the optimized build in the `dist` (or `build`) directory.

## Architecture & Structure

### Directory Layout
- **`src/`**: Main source code.
  - **`components/`**: Reusable UI components (e.g., `Navigation`, `Hero`).
  - **`pages/`**: Route-level components (e.g., `Home`, `Privacy`).
  - **`scss/`**: Global styles and partials. Entry point is `style.scss`.
  - **`assets/`**: Static images and icons.
  - **`hooks/`**: Custom React hooks.

### Core Technologies
- **Framework:** React 18 (Functional Components + Hooks).
- **Build Tool:** Vite.
- **Routing:** `react-router-dom` v6.
- **Styling:** SCSS with BEM naming convention.
  - Global entry: `src/scss/style.scss`.
  - Partials: `src/scss/partials/_*.scss`.
- **Linting:** ESLint + Prettier conventions.

## Development Conventions
- **Component Style:** Use functional components. `React.memo` is used for performance optimization on static/heavy components.
- **Styling:**
  - Use SCSS partials for modularity.
  - Follow BEM (Block Element Modifier) naming (e.g., `navbar__wrapper`, `navbar__logo`).
  - Import variables/mixins via `@use`.
- **Assets:** Import images directly in TypeScript files (e.g., `import logo from '../assets/...'`).
- **Icons:** FontAwesome classes (`fas fa-*`).
- **Aliases:** `@` is aliased to `src/` in `vite.config.ts`.
