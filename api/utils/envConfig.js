// Environment variables validation and configuration
const REQUIRED_ENV_VARS = ['LAGO_API_KEY'];

const envConfig = {
  LAGO_API_KEY: process.env.LAGO_API_KEY,
};

// Validate required environment variables
const validateEnv = () => {
  const missingVars = REQUIRED_ENV_VARS.filter((key) => !envConfig[key]);
  if (missingVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  return true;
};

// Run validation on load
validateEnv();

module.exports.envConfig = envConfig;
