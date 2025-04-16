# Server-Side API with Vercel Serverless Functions

This project uses Vercel Serverless Functions to create server-side APIs for making requests to external endpoints.

## Folder Structure

```
/api
  /services
    - subscriptionService.js (handles business logic for subscriptions)
  /utils
    - axiosConfig.js (axios configuration and interceptors)
    - envConfig.js (environment variables validation)
  /subscriptions
    - index.js (serverless function for subscription endpoints)
/src
  /setupProxy.js (routes API requests in development)
```

## Environment Variables

This project requires the following environment variables:

| Variable     | Description                              | Required |
| ------------ | ---------------------------------------- | -------- |
| LAGO_API_KEY | API key for authentication with Lago API | Yes      |

### Setting Up Environment Variables

#### Local Development

Create a `.env.local` file in the root of your project with the following content:

```
LAGO_API_KEY=your_api_key_here
```

#### Vercel Deployment

Add the environment variables in Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to Settings > Environment Variables
3. Add the required environment variables

## Development Setup

### Prerequisites

- Node.js >= 18.x
- npm >= 9.0.0
- Vercel CLI (installed globally)

### Running the API Locally

1. Install dependencies:

   ```
   npm install
   ```

2. Set up environment variables:

   - Create a `.env.local` file as described above

3. Run the development server with both React and Vercel functions:
   ```
   npm run dev
   ```

This will start:

- React development server on port 4500
- Vercel serverless functions on port 4501

The proxy setup in `src/setupProxy.js` will automatically route API requests from your React app to the Vercel dev server.

## API Endpoints

### Subscriptions

- `GET /api/subscriptions` - Get all subscriptions

## Adding New API Endpoints

1. Create a new service file in `/api/services/` with your business logic
2. Create a new serverless function in `/api/` with appropriate routing
3. Update the `vercel.json` file with new route definitions if needed

## Deployment

To deploy to Vercel:

```
npm run deploy
```

This will deploy both your React application and serverless functions to Vercel.
