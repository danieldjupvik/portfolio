const { apiClient } = require('../utils/axiosConfig');
const { envConfig } = require('../utils/envConfig');

const CUSTOMER_API_URL = 'https://lago.danieldjupvik.com/api/v1/customers';

// Error messages
const ERROR_MESSAGES = {
  missingApiKey:
    'API key is missing. Please set the LAGO_API_KEY environment variable.',
  timeout:
    'The connection to the customer service timed out. Please try again later.',
  connection:
    'Could not connect to the customer service. Please check the API endpoint configuration.',
  auth: 'Authentication failed. Please check your API key.',
  forbidden:
    'Access denied. Your API key does not have permission to access this resource.',
  notFound: 'Customer not found.',
  generic: 'Failed to fetch customer data. Please try again later.',
};

/**
 * Fetch customers from a specific page
 */
const fetchCustomersPage = async (page = 1) => {
  const response = await apiClient.get(`${CUSTOMER_API_URL}?page=${page}`);
  return response.data;
};

/**
 * Fetch all customers from the external API, handling pagination
 */
const getCustomers = async () => {
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  try {
    let allCustomers = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetchCustomersPage(currentPage);
      const { customers = [], meta } = response;

      allCustomers = [...allCustomers, ...customers];

      // Check if there's a next page
      hasNextPage = meta?.next_page !== null;
      currentPage = meta?.next_page || currentPage + 1;
    }

    return { customers: allCustomers };
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
    console.error('Error fetching customers:', error.message || error);
    throw new Error(ERROR_MESSAGES.generic);
  }
};

/**
 * Authenticate a customer by email
 */
const authenticateCustomer = async (email) => {
  try {
    const response = await getCustomers();
    const customers = response.customers || [];
    const customer = customers.find((c) => c.email === email);

    if (!customer) {
      throw new Error(ERROR_MESSAGES.notFound);
    }

    return customer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCustomers,
  authenticateCustomer,
};
