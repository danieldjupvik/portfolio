const { apiClient } = require('../utils/axiosConfig');
const { envConfig } = require('../utils/envConfig');

const SUBSCRIPTION_API_URL =
  'https://lago.danieldjupvik.com/api/v1/subscriptions';

// Error messages
const ERROR_MESSAGES = {
  missingApiKey:
    'API key is missing. Please set the LAGO_API_KEY environment variable.',
  timeout:
    'The connection to the subscription service timed out. Please try again later.',
  connection:
    'Could not connect to the subscription service. Please check the API endpoint configuration.',
  auth: 'Authentication failed. Please check your API key.',
  forbidden:
    'Access denied. Your API key does not have permission to access this resource.',
  notFound: 'Resource not found.',
  generic: 'Failed to fetch subscriptions. Please try again later.',
};

/**
 * Fetch all subscriptions from the external API
 */
const getSubscriptions = async () => {
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }
  try {
    console.log('Fetching subscriptions from external API');
    const response = await apiClient.get(SUBSCRIPTION_API_URL);
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
    console.error('Error fetching subscriptions:', error.message || error);
    throw new Error(ERROR_MESSAGES.generic);
  }
};

module.exports.getSubscriptions = getSubscriptions;
