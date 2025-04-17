console.log(process.env.LAGO_API_KEY);
// Environment variables validation and configuration
const REQUIRED_ENV_VARS = ['LAGO_API_KEY'];

// In Vercel, process.env is always available
const envConfig = {
  LAGO_API_KEY: process.env.LAGO_API_KEY,
};

// Validate required environment variables
const validateEnv = () => {
  const missingVars = REQUIRED_ENV_VARS.filter((key) => !envConfig[key]);
  if (missingVars.length > 0) {
    console.error(
      `⚠️ ERROR: Missing required environment variables: ${missingVars.join(
        ', '
      )}`
    );
    console.error(
      'Make sure you have a .env file with these variables defined for local development'
    );
    console.error(
      'For Vercel deployments, ensure these variables are set in the project settings'
    );
    return false;
  }
  console.log('✅ Environment variables validated successfully');
  return true;
};

// Run validation when module is loaded
const isValid = validateEnv();

// Export environment config and validation result
module.exports = {
  envConfig,
  isEnvValid: isValid,
};
