import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCustomer } from './contexts/CustomerContext';
import LoginPage from './LoginPage';
import {
  clearSubscriptionCache,
  fetchCustomerSubscription,
} from './subscriptionService';
import SubscriptionView from './SubscriptionView';
import {
  hasCustomerEmailChanged,
  isSessionAboutToExpire,
} from './utils/storageUtils';

// Define Subscription interface directly
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

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1024px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #ef4444;
  margin-top: 1rem;

  &:hover {
    background-color: #dc2626;
  }
`;

const WelcomeMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SessionWarning = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WarningButton = styled.button`
  background-color: #ffc107;
  color: #212529;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

const LoadingSpinner = styled.div`
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const LoadingText = styled.p`
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const CustomerPortal = () => {
  const {
    isAuthenticated,
    logout,
    customer,
    login,
    isLoading: isAuthLoading,
    refreshSession,
  } = useCustomer();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null
  );
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [emailAuthAttempted, setEmailAuthAttempted] = useState(false);
  const [sessionWarning, setSessionWarning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Combined loading state
  const isLoading = isAuthLoading || (isAuthenticated && isLoadingSubscription);
  const loadingMessage = isAuthLoading
    ? 'Logging in...'
    : 'Loading subscription details...';

  // Check for session expiration warning
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSessionExpiry = () => {
      const isExpiringSoon = isSessionAboutToExpire();
      setSessionWarning(isExpiringSoon);
    };

    // Check immediately
    checkSessionExpiry();

    // Then check every minute
    const intervalId = setInterval(checkSessionExpiry, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  // Get email from URL query parameter
  useEffect(() => {
    const tryEmailAuth = async () => {
      const searchParams = new URLSearchParams(location.search);
      const email = searchParams.get('email');

      if (!email) {
        // If no email in URL but we've attempted auth before, reset the flag
        // This allows the user to try again with a different email in URL
        if (emailAuthAttempted) {
          setEmailAuthAttempted(false);
        }
        return;
      }

      // If already authenticated but with a different email, logout first
      if (isAuthenticated && customer && hasCustomerEmailChanged(email)) {
        // Clear subscription data before logout
        setSubscription(null);
        clearSubscriptionCache();

        logout();
        setEmailAuthAttempted(false);
        return; // Let the next render cycle handle the new login
      }

      // Only attempt login if we haven't tried yet and not already authenticated
      if (email && !isAuthenticated && !emailAuthAttempted) {
        setEmailAuthAttempted(true);
        try {
          await login(email);
        } catch (err) {
          // Error is handled by the context
          console.error('Failed to authenticate with email from URL', err);
        }
      }
    };

    tryEmailAuth();
  }, [
    location.search,
    isAuthenticated,
    login,
    emailAuthAttempted,
    customer,
    logout,
  ]);

  // Load subscription data
  useEffect(() => {
    const loadSubscription = async () => {
      if (!customer?.external_id) {
        return;
      }

      setIsLoadingSubscription(true);
      setSubscriptionError(null);

      try {
        const data = await fetchCustomerSubscription(customer.external_id);
        setSubscription(data);
      } catch (err: any) {
        setSubscriptionError(err.message);
        setSubscription(null);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    if (isAuthenticated && customer) {
      loadSubscription();
    }
  }, [isAuthenticated, customer]);

  const handleLogout = () => {
    // Clear the email from URL when logging out
    if (location.search.includes('email=')) {
      // Navigate to the same page without query parameters
      navigate('/customer-portal', { replace: true });
    }

    logout();
    setSubscription(null);
    setSubscriptionError(null);
    setEmailAuthAttempted(false);
    setSessionWarning(false);
    clearSubscriptionCache();
  };

  // Unified loading handler
  if (isLoading) {
    return (
      <Container>
        <Title>Customer Portal</Title>
        <Card>
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>{loadingMessage}</LoadingText>
          </LoadingContainer>
        </Card>
      </Container>
    );
  }

  if (!isAuthenticated || !customer) {
    return <LoginPage />;
  }

  return (
    <Container>
      <Header>
        <Title>Customer Portal</Title>
        <LogoutButton onClick={handleLogout} aria-label='Log out' type='button'>
          Log Out
        </LogoutButton>
      </Header>
      <Card>
        <WelcomeMessage>Hi, {customer.name}</WelcomeMessage>
        <SubscriptionView
          subscription={subscription}
          isLoading={false}
          error={subscriptionError}
        />
      </Card>
    </Container>
  );
};

export default CustomerPortal;
