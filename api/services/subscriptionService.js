const apiClient = require('../utils/axiosConfig');
const envConfig = require('../utils/envConfig');

const SUBSCRIPTION_API_URL =
  'https://lago.danieldjupvik.com/api/v1/subscriptions';

// Get all subscriptions
const getSubscriptions = async () => {
  // Check if API key is configured
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(
      'API key is missing. Please set the LAGO_API_KEY environment variable.'
    );
  }

  try {
    console.log('Fetching subscriptions from external API');
    const response = await apiClient.get(SUBSCRIPTION_API_URL);
    return response.data;
  } catch (error) {
    // Handle specific error cases
    if (error.message && error.message.includes('timed out')) {
      console.error('Request to Lago API timed out');
      throw new Error(
        'The connection to the subscription service timed out. Please try again later.'
      );
    }

    if (
      error.message &&
      (error.message.includes('Unable to connect') ||
        error.code === 'ENOTFOUND' ||
        error.code === 'ECONNREFUSED')
    ) {
      console.error('Connection error to Lago API');
      throw new Error(
        'Could not connect to the subscription service. Please check the API endpoint configuration.'
      );
    }

    // Handle specific HTTP status codes
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (status === 403) {
        throw new Error(
          'Access denied. Your API key does not have permission to access this resource.'
        );
      } else if (status === 404) {
        throw new Error('Resource not found.');
      } else {
        throw new Error(
          `API error (${status}): ${
            error.response.data?.error || 'Unknown error'
          }`
        );
      }
    }

    console.error('Error fetching subscriptions:', error.message || error);
    throw new Error('Failed to fetch subscriptions. Please try again later.');
  }
};

module.exports = { getSubscriptions };
