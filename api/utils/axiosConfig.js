const axios = require('axios');

// Create a configured axios instance
const apiClient = axios.create({
  timeout: 1000, // 1 seconds
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.LAGO_API_KEY || ''}`,
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add additional logic here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Enhanced error handling
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

    // Handle axios errors
    console.error('API Error:', error.message || 'Unknown error');
    return Promise.reject(error);
  }
);

module.exports = apiClient;
