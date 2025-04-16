const {
  getCustomerCurrentUsage,
  formatUsageData,
} = require('../services/usageService');

/**
 * Get current usage for a customer and subscription
 */
const getCurrentUsage = async (req, res) => {
  try {
    const { externalCustomerId, externalSubscriptionId } = req.query;

    if (!externalCustomerId || !externalSubscriptionId) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required parameters: externalCustomerId and externalSubscriptionId',
      });
    }

    const usageData = await getCustomerCurrentUsage(
      externalCustomerId,
      externalSubscriptionId
    );
    const formattedUsage = formatUsageData(usageData);

    if (!formattedUsage) {
      return res.status(404).json({
        success: false,
        message: 'No usage data found',
      });
    }

    return res.status(200).json({
      success: true,
      data: formattedUsage,
    });
  } catch (error) {
    console.error('Error retrieving usage data:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve usage data',
    });
  }
};

module.exports = {
  getCurrentUsage,
};
