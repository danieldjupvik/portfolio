// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4501;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Add minimal request logging
app.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
});

// Dynamically load all API routes
const apiDirectory = path.join(__dirname);

// Function to register serverless functions as Express routes
const registerServerlessFunctions = (directory) => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((dirent) => {
    const fullPath = path.join(directory, dirent.name);

    if (dirent.isDirectory()) {
      registerServerlessFunctions(fullPath);
    } else if (dirent.name === 'index.js' && !fullPath.includes('server.js')) {
      // Get relative path without /api
      const routePath = directory.replace(apiDirectory, '').replace(/\\/g, '/');
      const handlerFunction = require(fullPath);

      console.log(`Registering API route: /api${routePath}`);

      // Register the route
      app.all(`/api${routePath}`, (req, res) => {
        handlerFunction(req, res);
      });
    }
  });
};

// Register all API routes
registerServerlessFunctions(apiDirectory);

// Start the server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
