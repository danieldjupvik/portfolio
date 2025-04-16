// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// Import route files
const customerRoutes = require('./routes/customerRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const usageRoutes = require('./routes/usageRoutes');

const app = express();
const PORT = process.env.PORT || 4501;

// Middleware: Enable CORS for all requests
const corsMiddleware = cors();
app.use(corsMiddleware);
app.use(express.json());

// Middleware: Minimal request logging
const requestLogger = (req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
};
app.use(requestLogger);

// Register API routes
app.use('/api/customers', customerRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/usage', usageRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
