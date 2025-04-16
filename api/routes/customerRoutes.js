const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const {
  setCorsHeaders,
  addRequestTimeout,
  handleApiError,
} = require('../utils/middleware');

// Constants for CORS
const ALLOWED_METHODS = 'POST,OPTIONS';

/**
 * Set CORS headers for all requests
 */
router.use((req, res, next) => {
  setCorsHeaders(res, ALLOWED_METHODS);

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

/**
 * Route for customer authentication
 */
router.post('/', async (req, res) => {
  try {
    // Add request timeout
    const clearTimeout = await addRequestTimeout(req, res);

    // Process the request
    await customerController.authenticateCustomer(req, res, clearTimeout);
  } catch (error) {
    handleApiError(res, error);
  }
});

module.exports = router;
