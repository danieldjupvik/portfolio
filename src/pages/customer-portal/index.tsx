import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCustomer } from '../../contexts/CustomerContext';
import LoginPage from './LoginPage';
import {
  clearSubscriptionCache,
  fetchCustomerSubscription,
} from './subscriptionService';
import SubscriptionView from './SubscriptionView';

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

const CustomerPortal = () => {
  const { isAuthenticated, logout, customer } = useCustomer();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(
    null
  );
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

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
    logout();
    setSubscription(null);
    setSubscriptionError(null);

    if (customer?.external_id) {
      clearSubscriptionCache(customer.external_id);
    }
  };

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
          isLoading={isLoadingSubscription}
          error={subscriptionError}
        />
      </Card>
    </Container>
  );
};

export default CustomerPortal;
