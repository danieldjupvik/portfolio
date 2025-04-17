// Define the type directly to avoid import issues
import { getStoredSubscription, storeSubscription } from './utils/storageUtils';

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

  // Check storage first
  const cachedSubscription = getStoredSubscription();
  if (
    cachedSubscription &&
    cachedSubscription.external_customer_id === externalId
  ) {
    return cachedSubscription;
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
    storeSubscription(formattedSubscription);

    return formattedSubscription;
  } catch (err) {
    throw err;
  }
};

/**
 * Clear the cached subscription data
 */
export const clearSubscriptionCache = (): void => {
  storeSubscription(null);
};
