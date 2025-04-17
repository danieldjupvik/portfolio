// Serverless function for usage
const { envConfig } = require('../utils/envConfig');
const { apiClient } = require('../utils/axiosConfig');

// Constants
const BASE_URL = 'https://lago.danieldjupvik.com/api/v1';
const REQUEST_TIMEOUT_MS = 20000;

// Error messages
const ERROR_MESSAGES = {
  missingApiKey:
    'API key is missing. Please set the LAGO_API_KEY environment variable.',
  timeout:
    'The connection to the usage service timed out. Please try again later.',
  connection:
    'Could not connect to the usage service. Please check the API endpoint configuration.',
  auth: 'Authentication failed. Please check your API key.',
  forbidden:
    'Access denied. Your API key does not have permission to access this resource.',
  notFound: 'Usage data not found.',
  missingParameters:
    'Missing required parameters: customer ID and subscription ID are required.',
  generic: 'Failed to fetch usage data. Please try again later.',
};

/**
 * Get usage data
 */
const getUsageData = async (externalCustomerId, externalSubscriptionId) => {
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  if (!externalCustomerId || !externalSubscriptionId) {
    throw new Error(ERROR_MESSAGES.missingParameters);
  }

  try {
    const response = await apiClient.get(
      `${BASE_URL}/customers/${externalCustomerId}/current_usage?external_subscription_id=${externalSubscriptionId}`
    );
    return response.data;
  } catch (error) {
    if (error.message && error.message.includes('timed out')) {
      console.error('Request to Lago API timed out');
      throw new Error(ERROR_MESSAGES.timeout);
    }
    if (
      error.message &&
      (error.message.includes('Unable to connect') ||
        error.code === 'ENOTFOUND' ||
        error.code === 'ECONNREFUSED')
    ) {
      console.error('Connection error to Lago API');
      throw new Error(ERROR_MESSAGES.connection);
    }
    if (error.response) {
      const { status } = error.response;
      if (status === 401) throw new Error(ERROR_MESSAGES.auth);
      if (status === 403) throw new Error(ERROR_MESSAGES.forbidden);
      if (status === 404) throw new Error(ERROR_MESSAGES.notFound);
      throw new Error(
        `API error (${status}): ${
          error.response.data?.error || 'Unknown error'
        }`
      );
    }
    console.error('Error fetching usage data:', error.message || error);
    throw new Error(ERROR_MESSAGES.generic);
  }
};

/**
 * Vercel serverless function handler
 */
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    console.log('Full query params:', req.query);
    const { externalCustomerId, externalSubscriptionId } = req.query;
    console.log(
      'Customer ID:',
      externalCustomerId,
      'Subscription ID:',
      externalSubscriptionId
    );

    if (!externalCustomerId || !externalSubscriptionId) {
      return res.status(400).json({
        error: 'Customer ID and subscription ID are required',
        timestamp: new Date().toISOString(),
      });
    }

    // Set timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const usageData = await getUsageData(
        externalCustomerId,
        externalSubscriptionId
      );
      clearTimeout(timeoutId);

      // Extract the customer_usage object from the response
      const customerUsage = usageData.customer_usage || null;

      return res.status(200).json({
        ...customerUsage,
        timestamp: new Date().toISOString(),
      });
    } catch (abortError) {
      if (abortError.name === 'AbortError') {
        return res.status(504).json({
          error: 'Gateway Timeout',
          message:
            'The request took too long to process. Please try again later.',
          timestamp: new Date().toISOString(),
        });
      }
      throw abortError;
    }
  } catch (error) {
    const errorMessage = error.message || 'Internal Server Error';
    let statusCode = 500;

    if (errorMessage.includes('API key is missing')) statusCode = 503;
    else if (errorMessage.includes('Authentication failed')) statusCode = 401;
    else if (errorMessage.includes('Access denied')) statusCode = 403;
    else if (errorMessage.includes('not found')) statusCode = 404;
    else if (errorMessage.includes('timed out')) statusCode = 504;
    else if (errorMessage.includes('Unable to connect')) statusCode = 502;

    return res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
