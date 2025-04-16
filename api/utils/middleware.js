/**
 * Common middleware functions for the API
 */

// Default timeout duration (20 seconds)
const DEFAULT_TIMEOUT_MS = 20000;

/**
 * Add a timeout to a request, automatically responding with an error
 * if the request takes too long
 */
const addRequestTimeout = (req, res, timeoutMs = DEFAULT_TIMEOUT_MS) => {
  return new Promise((resolve) => {
    const requestTimeout = setTimeout(() => {
      console.error(
        `API timeout: Request exceeded ${timeoutMs / 1000} seconds`
      );
      res.status(504).json({
        error: 'Gateway Timeout',
        message:
          'The request took too long to process. Please try again later.',
        timestamp: new Date().toISOString(),
      });
    }, timeoutMs);

    resolve(() => clearTimeout(requestTimeout));
  });
};

/**
 * Set standard CORS headers for API responses
 */
const setCorsHeaders = (res, methods = 'GET,POST,OPTIONS') => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
};

/**
 * Standard error handler for API responses
 */
const handleApiError = (res, error) => {
  const errorMessage = error.message || 'Internal Server Error';
  let statusCode = 500;

  if (errorMessage.includes('API key is missing')) statusCode = 503;
  else if (errorMessage.includes('Authentication failed')) statusCode = 401;
  else if (errorMessage.includes('Access denied')) statusCode = 403;
  else if (
    errorMessage.includes('not found') ||
    errorMessage.includes('No data found')
  )
    statusCode = 404;
  else if (errorMessage.includes('timed out')) statusCode = 504;
  else if (errorMessage.includes('Unable to connect')) statusCode = 502;

  res.status(statusCode).json({
    error: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  addRequestTimeout,
  setCorsHeaders,
  handleApiError,
  DEFAULT_TIMEOUT_MS,
};
