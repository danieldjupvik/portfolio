const axios = require('axios');

// Create a configured axios instance
const apiClient = axios.create({
  timeout: 10000, // 10 seconds
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
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

module.exports = apiClient;
