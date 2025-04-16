const axios = require('axios');

const REQUEST_TIMEOUT_MS = 1000;
const CONTENT_TYPE = 'application/json';
const AUTH_HEADER = `Bearer ${process.env.LAGO_API_KEY || ''}`;

// Configured axios instance for external API requests
const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': CONTENT_TYPE,
    Authorization: AUTH_HEADER,
  },
});

// Request interceptor (extendable for future logic)
apiClient.interceptors.request.use(
  (config) => config,
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

module.exports.apiClient = apiClient;
