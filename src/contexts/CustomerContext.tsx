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
      setError(null);
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate');
      }

      const data = await response.json();
      setCustomer(data.customer);
    } catch (err: any) {
      setError(err.message);
      throw err;
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
