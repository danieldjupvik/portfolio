const { getSubscriptions } = require('../services/subscriptionService');

const ALLOWED_METHODS = 'GET,OPTIONS';
const ALLOWED_HEADERS =
  'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version';
const TIMEOUT_DURATION_MS = 20000; // 20 seconds

/**
 * API handler for subscriptions endpoint
 */
const handleSubscriptions = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS);
  res.setHeader('Access-Control-Allow-Headers', ALLOWED_HEADERS);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Add request timeout for additional protection
  const requestTimeout = setTimeout(() => {
    console.error('API timeout: Request exceeded 20 seconds');
    res.status(504).json({
      error: 'Gateway Timeout',
      message: 'The request took too long to process. Please try again later.',
      timestamp: new Date().toISOString(),
    });
  }, TIMEOUT_DURATION_MS);

  try {
    const subscriptions = await getSubscriptions();
    clearTimeout(requestTimeout);
    res.status(200).json(subscriptions);
    return;
  } catch (error) {
    clearTimeout(requestTimeout);
    const errorMessage = error.message || 'Internal Server Error';
    let statusCode = 500;
    if (errorMessage.includes('API key is missing')) statusCode = 503;
    else if (errorMessage.includes('Authentication failed')) statusCode = 401;
    else if (errorMessage.includes('Access denied')) statusCode = 403;
    else if (errorMessage.includes('Resource not found')) statusCode = 404;
    else if (
      errorMessage.includes('timed out') ||
      errorMessage.includes('too long to respond')
    )
      statusCode = 504;
    else if (
      errorMessage.includes('Unable to connect') ||
      errorMessage.includes('Could not connect')
    )
      statusCode = 502;
    res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
    return;
  }
};

module.exports = handleSubscriptions;
