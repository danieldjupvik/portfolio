# Environment Variables Setup

To run this project locally, you need to set up environment variables for API authentication.

## 1. Create a .env.local file

Create a file named `.env.local` in the root directory of the project with the following content:

```
# Lago API Key - Get this from your Lago dashboard
LAGO_API_KEY=your_actual_api_key_here
```

## 2. Start the development server

After setting up the environment variables, you can start the development server:

```
npm run dev
```

## Note on Security

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- For production, set environment variables in the Vercel dashboard

## Testing Environment Variables

To confirm that your environment variables are loaded correctly, the API will validate and log warnings if any required variables are missing.
