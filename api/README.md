# API Documentation

## Overview

This is the API layer for the Customer Portal application. It provides endpoints for customer authentication, subscription management, and usage tracking.

## Structure

The API follows a hybrid MVC (Model-View-Controller) pattern designed to work both as an Express application and as Vercel serverless functions:

```
api/
  ├── controllers/      # Contains business logic for each endpoint
  │   ├── customerController.js
  │   ├── subscriptionController.js
  │   └── usageController.js
  ├── routes/           # Defines Express API routes and middleware
  │   ├── customerRoutes.js
  │   ├── subscriptionRoutes.js
  │   └── usageRoutes.js
  ├── services/         # Handles external API communication and data processing
  │   ├── customerService.js
  │   ├── subscriptionService.js
  │   └── usageService.js
  ├── utils/            # Common utilities and configuration
  │   ├── axiosConfig.js
  │   ├── envConfig.js
  │   └── middleware.js
  ├── customers/        # Vercel serverless function for customer endpoints
  │   └── index.js
  ├── subscriptions/    # Vercel serverless function for subscription endpoints
  │   └── index.js
  ├── usage/            # Vercel serverless function for usage endpoints
  │   └── index.js
  ├── server.js         # Express server setup (for local development)
  └── index.js          # Entry point
```

## Deployment Architecture

The API supports two deployment models:

1. **Express Server**: For local development, the entire API runs as an Express server via `server.js`
2. **Vercel Serverless Functions**: For production, the API is deployed as separate serverless functions in the `/api/{endpoint}` directories

Both implementations use the same underlying controllers and services, ensuring consistent behavior.

## Design Pattern

The API follows these design principles:

- **Separation of Concerns**: Each file has a single responsibility
- **DRY (Don't Repeat Yourself)**: Common code is extracted to middleware and utilities
- **Clean Architecture**: The flow goes from routes/serverless functions → controllers → services
- **Consistent Error Handling**: Standard approach to errors across all endpoints

## Endpoints

### Customer Authentication

- **URL**: `/api/customers`
- **Method**: `POST`
- **Body**:
  ```json
  { "email": "customer@example.com" }
  ```
- **Response**: Customer data or error

### Customer Subscription

- **URL**: `/api/subscriptions`
- **Method**: `GET`
- **Query Parameters**: `external_id` (customer ID)
- **Response**: Subscription data or error

### Customer Usage

- **URL**: `/api/usage`
- **Method**: `GET`
- **Query Parameters**:
  - `externalCustomerId` (customer ID)
  - `externalSubscriptionId` (subscription ID)
- **Response**: Current usage data or error

## Development

### Running the API Locally

```bash
# Start the API server
node api/server.js
```

### Vercel Deployment

The API is automatically deployed to Vercel. Each endpoint in the `/api/{endpoint}/index.js` files maps to a serverless function.

## Error Handling

All endpoints use a consistent error handling approach:

- HTTP status codes reflect the type of error
- Error responses include a message and timestamp
- Timeouts are implemented to prevent hanging requests

## Middleware

The API includes several reusable middleware functions:

- **setCorsHeaders**: Adds CORS headers to responses
- **addRequestTimeout**: Adds a timeout to prevent hanging requests
- **handleApiError**: Standardizes error responses
