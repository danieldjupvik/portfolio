// Serverless function for customer portal URL
const { envConfig } = require('../utils/envConfig');
const { apiClient } = require('../utils/axiosConfig');

// Constants
const BASE_URL = 'https://lago.danieldjupvik.com/api/v1';
const PORTAL_URL_BASE = 'https://lago.danieldjupvik.com';
const REQUEST_TIMEOUT_MS = 10000;

// Error messages
const ERROR_MESSAGES = {
  missingApiKey:
    'API key is missing. Please set the LAGO_API_KEY environment variable.',
  timeout:
    'The connection to the customer portal service timed out. Please try again later.',
  connection:
    'Could not connect to the customer portal service. Please check the API endpoint configuration.',
  auth: 'Authentication failed. Please check your API key.',
  forbidden:
    'Access denied. Your API key does not have permission to access this resource.',
  notFound: 'Customer portal URL not found.',
  missingParameters: 'Missing required parameter: customer ID is required.',
  generic: 'Failed to fetch customer portal URL. Please try again later.',
};

/**
 * Get customer portal URL
 */
const getCustomerPortalUrl = async (externalCustomerId) => {
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  if (!externalCustomerId) {
    throw new Error(ERROR_MESSAGES.missingParameters);
  }

  try {
    const response = await apiClient.get(
      `${BASE_URL}/customers/${externalCustomerId}/portal_url`
    );

    // Extract the customer portal URL and replace the base
    const portalUrl = response.data?.customer?.portal_url;
    if (!portalUrl) {
      throw new Error(ERROR_MESSAGES.notFound);
    }

    // Replace the base URL with our domain
    // The URL format is: http://192.168.10.20:81/customer-portal/...
    // We need to replace http://192.168.10.20:81 with https://lago.danieldjupvik.com
    const formattedUrl = portalUrl.replace(/^http:\/\/[^\/]+/, PORTAL_URL_BASE);

    return { portal_url: formattedUrl };
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
    console.error(
      'Error fetching customer portal URL:',
      error.message || error
    );
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
    const { externalCustomerId } = req.query;
    console.log('Customer ID:', externalCustomerId);

    if (!externalCustomerId) {
      return res.status(400).json({
        error: 'Customer ID is required',
        timestamp: new Date().toISOString(),
      });
    }

    // Set timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const portalData = await getCustomerPortalUrl(externalCustomerId);
      clearTimeout(timeoutId);

      return res.status(200).json({
        ...portalData,
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
