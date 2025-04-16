import apiClient from '../utils/axiosConfig';
import envConfig from '../utils/envConfig';

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
    const response = await apiClient.get(SUBSCRIPTION_API_URL);
    return response.data;
  } catch (error) {
    // Handle specific error codes
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

    console.error('Error fetching subscriptions:', error);
    throw error;
  }
};

export { getSubscriptions };
