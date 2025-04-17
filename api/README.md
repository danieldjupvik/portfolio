# API Service

## Overview

This API service provides endpoints for accessing customer data, subscriptions, and usage metrics. It is implemented as a set of Vercel serverless functions that connect to the Lago API for billing and subscription management.

## Endpoints

- **GET /api/customers**: Authenticates a customer by email
- **GET /api/subscriptions**: Gets subscriptions for a customer
- **GET /api/usage**: Gets usage metrics for billable items

## Implementation

The API is built using Vercel serverless functions. Each endpoint is implemented as a separate function that handles API requests directly, without using Express.

### Key features:

- **Authentication**: Customers are authenticated by their email address
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Timeout Protection**: Requests that take too long automatically time out
- **CORS Support**: All endpoints include proper CORS headers

## Development

### Requirements

- Node.js 22.x or higher
- npm 10.x or higher

### Environment Variables

The following environment variables are required:

- `LAGO_API_KEY`: API key for accessing Lago services

### Running Locally

To run the API locally with the Vercel development environment:

```bash
npm run dev:vercel
```

This will start both the frontend and the API server.

## Architecture

Each API endpoint follows this structure:

1. **Request Validation**: Checks for required parameters and valid HTTP methods
2. **Authentication**: Verifies that the request includes necessary credentials
3. **External API Call**: Makes authenticated requests to the Lago API
4. **Response Formatting**: Formats and returns the data with proper status codes

## Error Handling

The API implements a standardized error-handling approach:

- **400**: Missing required parameters
- **401**: Authentication failed
- **403**: Permission denied
- **404**: Resource not found
- **500**: Internal server error
- **502**: Gateway error (cannot reach Lago API)
- **503**: Service unavailable (missing configuration)
- **504**: Gateway timeout
