import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  clearStorage,
  extendSession,
  getStoredCustomer,
  hasCustomerEmailChanged,
  storeCustomer,
} from '../utils/storageUtils';

export interface Customer {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

interface CustomerContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  isLoading: boolean;
  refreshSession: () => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(() => {
    // Initialize state from storage
    return getStoredCustomer();
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update storage when customer state changes
  useEffect(() => {
    if (customer) {
      storeCustomer(customer);
    } else {
      clearStorage();
    }
  }, [customer]);

  // Auto-refresh session periodically when customer is active
  useEffect(() => {
    if (!customer) return;

    // Extend session every 30 minutes if the user is still active
    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        extendSession();
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(intervalId);
  }, [customer]);

  const login = async (email: string) => {
    try {
      // Always reset the error state at the beginning of login
      setError(null);

      // Check if trying to login with a different email than currently stored
      if (customer && hasCustomerEmailChanged(email)) {
        // We'll handle the logout in the component using this context
        // This prevents issues with state updates during render
        console.log(
          'Email changed from stored customer, will need to logout first'
        );
      }

      console.log('Attempting to login with email:', email);
      setIsLoading(true);

      // Use AbortController to handle timeout on the client side as well
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second client-side timeout

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        throw new Error(errorData.error || 'Failed to authenticate');
      }

      const data = await response.json();
      console.log('Login successful, customer data received');
      setCustomer(data.customer);
    } catch (err: any) {
      console.error('Login error:', err);

      // Handle abort error specifically
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again later.');
      } else {
        setError(err.message || 'An unknown error occurred');
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCustomer(null);
    setError(null);
    clearStorage();
  };

  // Manual refresh of session expiration
  const refreshSession = () => {
    if (customer) {
      extendSession();
    }
  };

  const value = {
    customer,
    isAuthenticated: !!customer,
    login,
    logout,
    error,
    isLoading,
    refreshSession,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
