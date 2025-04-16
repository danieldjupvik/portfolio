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

  try {
    // Get all subscriptions
    const subscriptions = await getSubscriptions();
    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Serverless function error:', error);

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
    }

    // Return error response
    return res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
