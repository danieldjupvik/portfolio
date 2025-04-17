import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface Customer {
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
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'customerPortal';

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(() => {
    // Initialize state from localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        return parsed.customer || null;
      } catch (e) {
        console.error('Error parsing stored customer data:', e);
        return null;
      }
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update localStorage when customer state changes
  useEffect(() => {
    if (customer) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ customer }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [customer]);

  const login = async (email: string) => {
    try {
      console.log('Attempting to login with email:', email);
      setError(null);
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
  };

  const value = {
    customer,
    isAuthenticated: !!customer,
    login,
    logout,
    error,
    isLoading,
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
