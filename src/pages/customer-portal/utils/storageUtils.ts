import { Customer } from '../contexts/CustomerContext';

// The main storage key for the application
export const STORAGE_KEY = 'customerPortalData';

// Default session expiration time (2 hours in milliseconds)
export const DEFAULT_SESSION_EXPIRY = 2 * 60 * 60 * 1000;

interface StorageData {
  customer: Customer | null;
  subscription: any | null;
  lastUpdated: number;
  expiresAt: number;
}

/**
 * Get customer data from storage
 * @returns The customer data or null if not found or expired
 */
export const getStoredCustomer = (): Customer | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return null;
    }

    const parsed = JSON.parse(data) as StorageData;

    // Check if the data has expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      clearStorage();
      return null;
    }

    return parsed.customer;
  } catch (e) {
    console.error('Error parsing stored customer data:', e);
    clearStorage();
    return null;
  }
};

/**
 * Get subscription data from storage
 * @returns The subscription data or null if not found or expired
 */
export const getStoredSubscription = (): any | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return null;
    }

    const parsed = JSON.parse(data) as StorageData;

    // Check if the data has expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      clearStorage();
      return null;
    }

    return parsed.subscription;
  } catch (e) {
    console.error('Error parsing stored subscription data:', e);
    clearStorage();
    return null;
  }
};

/**
 * Store customer data in storage with expiration
 * @param customer The customer data
 * @param expiresInMs The time in milliseconds until the data expires (default 2 hours)
 */
export const storeCustomer = (
  customer: Customer | null,
  expiresInMs: number = DEFAULT_SESSION_EXPIRY
): void => {
  if (!customer) {
    updateStorageData({ customer: null });
    return;
  }

  updateStorageData({
    customer,
    expiresAt: Date.now() + expiresInMs,
  });
};

/**
 * Store subscription data in storage
 * @param subscription The subscription data
 */
export const storeSubscription = (subscription: any | null): void => {
  updateStorageData({ subscription });
};

/**
 * Check if the session is about to expire
 * @param warningThresholdMs Time in milliseconds before expiry to trigger warning (default 5 minutes)
 * @returns True if the session is about to expire, false otherwise
 */
export const isSessionAboutToExpire = (
  warningThresholdMs: number = 5 * 60 * 1000
): boolean => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return false;
    }

    const parsed = JSON.parse(data) as StorageData;
    const timeUntilExpiry = parsed.expiresAt - Date.now();

    return timeUntilExpiry > 0 && timeUntilExpiry < warningThresholdMs;
  } catch (e) {
    return false;
  }
};

/**
 * Extend the current session expiration time
 * @param expiresInMs The new time in milliseconds until the data expires (default 2 hours)
 */
export const extendSession = (
  expiresInMs: number = DEFAULT_SESSION_EXPIRY
): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return;
    }

    const parsed = JSON.parse(data) as StorageData;

    updateStorageData({
      expiresAt: Date.now() + expiresInMs,
    });
  } catch (e) {
    console.error('Error extending session:', e);
  }
};

/**
 * Clear all storage data
 */
export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Check if the customer email has changed
 * @param email The new email to check
 * @returns True if the email is different from the stored customer email
 */
export const hasCustomerEmailChanged = (email: string): boolean => {
  if (!email) return false;

  const customer = getStoredCustomer();
  if (!customer || !customer.email) return false;

  // Case-insensitive comparison for email addresses
  return customer.email.toLowerCase() !== email.toLowerCase();
};

// Private helper function to update storage data
const updateStorageData = (updates: Partial<StorageData>): void => {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    let data: StorageData = {
      customer: null,
      subscription: null,
      lastUpdated: Date.now(),
      expiresAt: Date.now() + DEFAULT_SESSION_EXPIRY,
    };

    if (current) {
      data = { ...data, ...JSON.parse(current) };
    }

    // Update with new values
    data = { ...data, ...updates, lastUpdated: Date.now() };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error updating storage data:', e);
  }
};
