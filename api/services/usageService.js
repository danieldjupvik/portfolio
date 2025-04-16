const { apiClient } = require('../utils/axiosConfig');
const { envConfig } = require('../utils/envConfig');

const BASE_URL = 'https://lago.danieldjupvik.com/api/v1';

// Error messages
const ERROR_MESSAGES = {
  missingApiKey:
    'API key is missing. Please set the LAGO_API_KEY environment variable.',
  missingParameters:
    'Customer external ID and subscription external ID are required.',
  timeout:
    'The connection to the usage service timed out. Please try again later.',
  connection:
    'Could not connect to the usage service. Please check the API endpoint configuration.',
  auth: 'Authentication failed. Please check your API key.',
  forbidden:
    'Access denied. Your API key does not have permission to access this resource.',
  notFound: 'No usage data found for this customer and subscription.',
  generic: 'Failed to fetch usage data. Please try again later.',
};

/**
 * Fetch the current usage for a customer and subscription
 */
const getCustomerCurrentUsage = async (
  externalCustomerId,
  externalSubscriptionId
) => {
  if (!envConfig.LAGO_API_KEY) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  if (!externalCustomerId || !externalSubscriptionId) {
    throw new Error(ERROR_MESSAGES.missingParameters);
  }

  try {
    const response = await apiClient.get(
      `${BASE_URL}/customers/${externalCustomerId}/current_usage?external_subscription_id=${externalSubscriptionId}`
    );

    return response.data;
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
    console.error('Error fetching usage data:', error.message || error);
    throw new Error(ERROR_MESSAGES.generic);
  }
};

/**
 * Format the usage data for display
 */
const formatUsageData = (usageData) => {
  if (!usageData || !usageData.customer_usage) {
    return null;
  }

  const { customer_usage } = usageData;

  return {
    billingPeriod: {
      from: customer_usage.from_datetime,
      to: customer_usage.to_datetime,
      issuingDate: customer_usage.issuing_date,
    },
    currency: customer_usage.currency,
    amount: {
      cents: customer_usage.amount_cents,
      total: customer_usage.total_amount_cents,
      taxes: customer_usage.taxes_amount_cents,
    },
    charges: customer_usage.charges_usage.map((charge) => ({
      units: parseFloat(charge.units),
      eventsCount: charge.events_count,
      amountCents: charge.amount_cents,
      amountCurrency: charge.amount_currency,
      charge: {
        id: charge.charge.lago_id,
        model: charge.charge.charge_model,
        displayName: charge.charge.invoice_display_name || 'Unnamed Charge',
      },
      metric: {
        id: charge.billable_metric.lago_id,
        name: charge.billable_metric.name,
        code: charge.billable_metric.code,
        aggregationType: charge.billable_metric.aggregation_type,
      },
    })),
  };
};

module.exports = {
  getCustomerCurrentUsage,
  formatUsageData,
};
