const { getCustomerSubscriptions } = require('../services/subscriptionService');

/**
 * Get subscriptions for a specific customer
 */
const getSubscription = async (req, res, clearTimeout) => {
  try {
    // Get external_id from query parameters
    const { external_id } = req.query;

    if (!external_id) {
      if (clearTimeout) clearTimeout();
      return res.status(400).json({
        error: 'Customer external_id is required',
        timestamp: new Date().toISOString(),
      });
    }

    const { subscription } = await getCustomerSubscriptions(external_id);
    if (clearTimeout) clearTimeout();

    return res.status(200).json({
      subscription,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (clearTimeout) clearTimeout();

    const errorMessage = error.message || 'Internal Server Error';
    let statusCode = 500;

    if (errorMessage.includes('API key is missing')) statusCode = 503;
    else if (errorMessage.includes('Authentication failed')) statusCode = 401;
    else if (errorMessage.includes('Access denied')) statusCode = 403;
    else if (errorMessage.includes('Subscription not found')) statusCode = 404;
    else if (errorMessage.includes('timed out')) statusCode = 504;
    else if (errorMessage.includes('Unable to connect')) statusCode = 502;

    return res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = {
  getSubscription,
};
