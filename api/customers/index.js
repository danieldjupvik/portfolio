const { authenticateCustomer } = require('../controllers/customerController');
const { setCorsHeaders, handleApiError } = require('../utils/middleware');

// Constants for CORS
const ALLOWED_METHODS = 'POST,OPTIONS';
const TIMEOUT_DURATION_MS = 20000; // 20 seconds

/**
 * API handler for customer authentication endpoint (Vercel serverless function)
 */
const handleCustomerAuth = async (req, res) => {
  // Set CORS headers
  setCorsHeaders(res, ALLOWED_METHODS);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
    // Use the controller logic but pass our own clearTimeout function
    await authenticateCustomer(req, res, () => clearTimeout(requestTimeout));
  } catch (error) {
    clearTimeout(requestTimeout);
    handleApiError(res, error);
  }
};

module.exports = handleCustomerAuth;
