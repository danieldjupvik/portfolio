const { getSubscriptions } = require('../services/subscriptionService');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Add request timeout for additional protection
  const TIMEOUT_DURATION = 20000; // 20 seconds
  const requestTimeout = setTimeout(() => {
    console.error('API timeout: Request exceeded 20 seconds');
    return res.status(504).json({
      error: 'Gateway Timeout',
      message: 'The request took too long to process. Please try again later.',
      timestamp: new Date().toISOString(),
    });
  }, TIMEOUT_DURATION);

  try {
    // Get all subscriptions
    const subscriptions = await getSubscriptions();

    // Clear the timeout as request completed successfully
    clearTimeout(requestTimeout);

    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error('API error:', error.message || error);

    // Clear the timeout as we're handling the error
    clearTimeout(requestTimeout);

    // Extract meaningful error message
    const errorMessage = error.message || 'Internal Server Error';

    // Determine appropriate status code
    let statusCode = 500;
    if (errorMessage.includes('API key is missing')) {
      statusCode = 503; // Service Unavailable
    } else if (errorMessage.includes('Authentication failed')) {
      statusCode = 401; // Unauthorized
    } else if (errorMessage.includes('Access denied')) {
      statusCode = 403; // Forbidden
    } else if (errorMessage.includes('Resource not found')) {
      statusCode = 404; // Not Found
    } else if (
      errorMessage.includes('timed out') ||
      errorMessage.includes('too long to respond')
    ) {
      statusCode = 504; // Gateway Timeout
    } else if (
      errorMessage.includes('Unable to connect') ||
      errorMessage.includes('Could not connect')
    ) {
      statusCode = 502; // Bad Gateway
    }

    // Return error response
    return res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
