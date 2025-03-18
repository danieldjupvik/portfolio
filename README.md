# Portfolio danieldjupvik.dev

Link to live website [danieldjupvik.dev](https://danieldjupvik.dev)

MovieWatcht App Landing page [danieldjupvik.dev/MovieWatcht](https://danieldjupvik.dev/moviewatcht)

Daniel AI page [danieldjupvik.dev/ai](https://danieldjupvik.dev/ai)

## Development Setup

This project uses React 18 with React Router v6 and requires Node.js v18 or higher. It uses Yarn as the package manager.

### Prerequisites

- Node.js v18.x or higher (an .nvmrc file is included for NVM users)
- Yarn package manager

### Setup with NVM (recommended)

If you have [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) installed:

```bash
# Automatically switch to the correct Node.js version using .nvmrc
nvm use

# Install Yarn if you don't have it
npm install -g yarn

# Install dependencies
yarn install

# Start the development server
yarn start
```

### Manual Setup

If you're not using NVM:

```bash
# Ensure you're using Node.js v18.x or higher
node -v

# Install dependencies
yarn install

# Start the development server
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Build for Production

To create an optimized production build:

```bash
yarn build
```

The build output will be in the `build` directory, ready for deployment to a static hosting service.

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `pages/` - Page components
  - `assets/` - Static assets like images
  - `scss/` - SASS stylesheets

## Technologies

- React 18
- React Router 6
- SASS for styling
- Typewriter Effect
