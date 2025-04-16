// Environment variables validation and configuration
const envConfig = {
  LAGO_API_KEY: process.env.LAGO_API_KEY,
};

// Validate required environment variables
const validateEnv = () => {
  const missingVars = [];

  if (!envConfig.LAGO_API_KEY) {
    missingVars.push('LAGO_API_KEY');
  }

  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
    return false;
  }

  return true;
};

// Run validation
validateEnv();

module.exports = envConfig;
