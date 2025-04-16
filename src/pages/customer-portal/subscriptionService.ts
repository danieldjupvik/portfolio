// Define the type directly to avoid import issues
interface Subscription {
  status: string;
  plan_code: string;
  external_id: string;
  external_customer_id: string;
  subscription_at?: string;
  started_at?: string;
  current_billing_period_started_at: string;
  current_billing_period_ending_at: string;
  [key: string]: any;
}

/**
 * Fetch subscription data for a customer
 * @param externalId Customer external ID
 * @returns The subscription data or null if not found
 */
export const fetchCustomerSubscription = async (
  externalId: string
): Promise<Subscription | null> => {
  if (!externalId) {
    return null;
  }

  // Check localStorage first
  const cachedSubscription = localStorage.getItem(`subscription_${externalId}`);
  if (cachedSubscription) {
    try {
      return JSON.parse(cachedSubscription);
    } catch (err) {
      localStorage.removeItem(`subscription_${externalId}`);
    }
  }

  try {
    const response = await fetch(
      `/api/subscriptions?external_id=${encodeURIComponent(externalId)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch subscription');
    }

    const data = await response.json();
    const subscriptionData = data.subscription;

    if (!subscriptionData) {
      return null;
    }

    const formattedSubscription = {
      ...subscriptionData,
      status: subscriptionData.status || 'unknown',
      plan_code: subscriptionData.plan_code || '',
      external_id: subscriptionData.external_id || '',
      external_customer_id: subscriptionData.external_customer_id || '',
      started_at:
        subscriptionData.started_at || subscriptionData.subscription_at || null,
    };

    // Cache the subscription data
    localStorage.setItem(
      `subscription_${externalId}`,
      JSON.stringify(formattedSubscription)
    );

    return formattedSubscription;
  } catch (err) {
    throw err;
  }
};

/**
 * Clear the cached subscription data for a customer
 * @param externalId Customer external ID
 */
export const clearSubscriptionCache = (externalId: string): void => {
  if (externalId) {
    localStorage.removeItem(`subscription_${externalId}`);
  }
};
