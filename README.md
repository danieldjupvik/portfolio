# Portfolio danieldjupvik.dev

Link to live website [danieldjupvik.dev](https://danieldjupvik.dev)

MovieWatcht App Landing page [danieldjupvik.dev/MovieWatcht](https://danieldjupvik.dev/moviewatcht)

Daniel AI page [danieldjupvik.dev/ai](https://danieldjupvik.dev/ai)

## Development Setup

This project uses React 18 with React Router v6 and requires Node.js v22 or higher. It uses npm as the package manager and Vite as the build tool.

### Prerequisites

- Node.js v22.x or higher (an .nvmrc file is included for NVM users)
- npm package manager

### Setup with NVM (recommended)

If you have [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) installed:

```bash
# Automatically switch to the correct Node.js version using .nvmrc
nvm use

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Manual Setup

If you're not using NVM:

```bash
# Ensure you're using Node.js v22.x or higher
node -v

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at [http://localhost:4500](http://localhost:4500).

## API Development

To start the API server:

```bash
npm run dev:api
```

To run both the frontend and API simultaneously:

```bash
npm run dev:all
```

## Build for Production

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `build` directory, ready for deployment.

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `pages/` - Page components
  - `assets/` - Static assets like images
  - `scss/` - SASS stylesheets
  - `hooks/` - Custom React hooks
  - `types/` - TypeScript type definitions
- `api/` - Backend API code
- `public/` - Static assets

## Technologies

- React 18
- React Router 6
- Vite
- TypeScript
- SASS for styling
- Styled Components
- Typewriter Effect
- Express (for API)
