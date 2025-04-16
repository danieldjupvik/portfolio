const { apiClient } = require('../utils/axiosConfig');
const { envConfig } = require('../utils/envConfig');

const BASE_URL = 'https://lago.danieldjupvik.com/api/v1';

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
  notFound: 'No subscriptions found for this customer.',
  generic: 'Failed to fetch subscription data. Please try again later.',
};

/**
 * Fetch a page of subscriptions
 */
const fetchSubscriptionsPage = async (page = 1) => {
  const response = await apiClient.get(
    `${BASE_URL}/subscriptions?page=${page}`
  );
  return response.data;
};

/**
 * Fetch all subscriptions for a customer by their external_id
 */
const getCustomerSubscriptions = async (customerExternalId) => {
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  if (!customerExternalId) {
    throw new Error('Customer external_id is required');
  }

  try {
    let allCustomerSubscriptions = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetchSubscriptionsPage(currentPage);
      const { subscriptions = [], meta } = response;

      // Filter subscriptions for this customer
      const customerSubscriptions = subscriptions.filter(
        (sub) => sub.external_customer_id === customerExternalId
      );

      allCustomerSubscriptions = [
        ...allCustomerSubscriptions,
        ...customerSubscriptions,
      ];

      // Check if there's a next page
      hasNextPage = meta?.next_page !== null;
      currentPage = meta?.next_page || currentPage + 1;
    }

    // Find the single subscription for this customer
    const subscription = allCustomerSubscriptions.find(
      (sub) => sub.external_customer_id === customerExternalId
    );

    if (!subscription) {
      throw new Error(ERROR_MESSAGES.notFound);
    }

    // Return single subscription with formatted fields
    return {
      subscription: {
        ...subscription,
        status: subscription.status || 'unknown',
        plan_code: subscription.plan_code || '',
        external_id: subscription.external_id || '',
        external_customer_id: subscription.external_customer_id || '',
        started_at:
          subscription.started_at || subscription.subscription_at || null,
      },
    };
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
    throw error;
  }
};

module.exports = {
  getCustomerSubscriptions,
};
