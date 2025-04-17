// Serverless function for customer authentication
// const { authenticateCustomer } = require('../controllers/customerController');
// const { setCorsHeaders, handleApiError } = require('../utils/middleware');
const { envConfig, isEnvValid } = require('../utils/envConfig');
const { apiClient } = require('../utils/axiosConfig');

// Constants for CORS
// const ALLOWED_METHODS = 'POST,OPTIONS';
// Reduced timeout from 20 seconds to 8 seconds
const REQUEST_TIMEOUT_MS = 8000;

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

// Constants
const CUSTOMER_API_URL = 'https://lago.danieldjupvik.com/api/v1/customers';

/**
 * Search for a customer by email through paginated results
 */
const searchCustomerByEmail = async (email) => {
  console.log(`[API] Searching for customer with email: ${email}`);

  // Check API key before making any requests
  if (!envConfig.LAGO_API_KEY) {
    console.error('[API] LAGO_API_KEY is missing or empty');
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  console.log(`[API] Starting paginated search for email: ${email}`);
  let currentPage = 1;
  const maxPages = 5; // Limit pages to search through to avoid long-running requests

  while (currentPage <= maxPages) {
    console.log(`[API] Searching page ${currentPage}...`);
    const response = await apiClient.get(
      `${CUSTOMER_API_URL}?page=${currentPage}`
    );
    const { customers = [], meta } = response.data;

    // Look for matching customer
    const customer = customers.find((c) => c.email === email);
    if (customer) {
      console.log(`[API] Found customer on page ${currentPage}`);
      return customer;
    }

    // Check if there's a next page
    if (meta?.next_page === null) {
      console.log(`[API] No more pages to search`);
      break;
    }

    currentPage = meta?.next_page;
  }

  console.log(`[API] Customer not found after searching ${currentPage} pages`);
  return null;
};

/**
 * Authenticate a customer by email
 */
const authenticateCustomer = async (email) => {
  console.log(`[API] Starting authentication for email: ${email}`);

  // This is already checked in searchCustomerByEmail, but double-checking for safety
  if (!envConfig.LAGO_API_KEY) {
    console.error('[API] Missing API key');
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  const customer = await searchCustomerByEmail(email);

  if (!customer) {
    console.log(`[API] Authentication failed: customer not found`);
    throw new Error(ERROR_MESSAGES.notFound);
  }

  console.log(`[API] Authentication successful for: ${email}`);
  return customer;
};

/**
 * Vercel serverless function handler
 */
module.exports = async (req, res) => {
  console.log(`[API] Request received: ${req.method}`);
  const startTime = Date.now();

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log(`[API] Method not allowed: ${req.method}`);
    return res.status(405).json({
      error: 'Method Not Allowed',
      timestamp: new Date().toISOString(),
    });
  }

  // Check if environment variables are valid before proceeding
  if (!isEnvValid) {
    console.error('[API] Environment validation failed - missing LAGO_API_KEY');
    return res.status(503).json({
      error: ERROR_MESSAGES.missingApiKey,
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const { email } = req.body;
    console.log(`[API] Login attempt with email: ${email}`);

    if (!email) {
      console.log(`[API] Email required but not provided`);
      return res.status(400).json({
        error: 'Email is required',
        timestamp: new Date().toISOString(),
      });
    }

    // Set timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`[API] Request timed out after ${REQUEST_TIMEOUT_MS}ms`);
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const customer = await authenticateCustomer(email);
      clearTimeout(timeoutId);

      const responseTime = Date.now() - startTime;
      console.log(`[API] Request completed successfully in ${responseTime}ms`);

      return res.status(200).json({
        customer,
        timestamp: new Date().toISOString(),
      });
    } catch (abortError) {
      clearTimeout(timeoutId);
      if (abortError.name === 'AbortError') {
        console.log(`[API] Request aborted due to timeout`);
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
    else if (errorMessage.includes('Customer not found')) statusCode = 404;
    else if (errorMessage.includes('timed out')) statusCode = 504;
    else if (errorMessage.includes('Unable to connect')) statusCode = 502;

    const responseTime = Date.now() - startTime;
    console.log(
      `[API] Request failed with status ${statusCode} in ${responseTime}ms: ${errorMessage}`
    );

    return res.status(statusCode).json({
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
