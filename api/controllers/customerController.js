const {
  authenticateCustomer: authenticate,
} = require('../services/customerService');

/**
 * Authenticate a customer using their email
 */
const authenticateCustomer = async (req, res, clearTimeout) => {
  try {
    const { email } = req.body;

    if (!email) {
      if (clearTimeout) clearTimeout();
      return res.status(400).json({
        error: 'Email is required',
        timestamp: new Date().toISOString(),
      });
    }

    const customer = await authenticate(email);
    if (clearTimeout) clearTimeout();

    return res.status(200).json({
      customer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (clearTimeout) clearTimeout();

    const errorMessage = error.message || 'Internal Server Error';
    let statusCode = 500;

    if (errorMessage.includes('API key is missing')) statusCode = 503;
    else if (errorMessage.includes('Authentication failed')) statusCode = 401;
    else if (errorMessage.includes('Access denied')) statusCode = 403;
    else if (errorMessage.includes('Customer not found')) statusCode = 404;
    else if (errorMessage.includes('timed out')) statusCode = 504;
    else if (errorMessage.includes('Unable to connect')) statusCode = 502;

    return res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = {
  authenticateCustomer,
};
