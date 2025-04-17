const axios = require('axios');
const { envConfig } = require('./envConfig');

// Match the timeout with serverless function timeout
const REQUEST_TIMEOUT_MS = 15000;
const CONTENT_TYPE = 'application/json';

// Configured axios instance for external API requests
const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': CONTENT_TYPE,
  },
});

// Request interceptor to add API key from environment for each request
apiClient.interceptors.request.use(
  (config) => {
    // Set the Authorization header dynamically for each request
    // This ensures we always use the latest value from environment
    const apiKey = envConfig.LAGO_API_KEY;
    if (apiKey) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    } else {
      console.error('[API] LAGO_API_KEY is missing from environment');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for enhanced error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout to external API');
      return Promise.reject(
        new Error(
          'Request timed out. The server is taking too long to respond.'
        )
      );
    }
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error(`Connection error: ${error.code}`);
      return Promise.reject(
        new Error(
          'Unable to connect to the API server. Please check your internet connection or the API endpoint.'
        )
      );
    }
    console.error('API Error:', error.message || 'Unknown error');
    return Promise.reject(error);
  }
);

module.exports = {
  apiClient,
};
