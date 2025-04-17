import styled from 'styled-components';
import { Usage } from './components/Usage';

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

const SubscriptionStatus = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$status === 'active'
      ? '#dcfce7'
      : props.$status === 'pending'
      ? '#fef9c3'
      : '#f3f4f6'};
  color: ${(props) =>
    props.$status === 'active'
      ? '#15803d'
      : props.$status === 'pending'
      ? '#854d0e'
      : '#374151'};
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

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const Separator = styled.hr`
  margin: 2rem 0;
  border: 0;
  height: 1px;
  background-color: #e5e7eb;
`;

const ManagePaymentButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4f46e5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
  }
`;

const Icon = styled.span`
  display: inline-block;
`;

const STRIPE_PAYMENT_URL =
  'https://billing.stripe.com/p/login/4gw16SbA01143YIfYY';

interface SubscriptionViewProps {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
}

const SubscriptionView = ({
  subscription,
  isLoading,
  error,
}: SubscriptionViewProps) => {
  // Only show loading spinner if explicitly requested
  // (We're now handling most loading states at the CustomerPortal level)
  if (isLoading) {
    return (
      <SubscriptionStatus>
        <LoadingSpinner />
      </SubscriptionStatus>
    );
  }

  if (error) {
    return (
      <SubscriptionStatus>
        <ErrorMessage>{error}</ErrorMessage>
      </SubscriptionStatus>
    );
  }

  if (!subscription) {
    return (
      <SubscriptionStatus>
        <div>No active subscription found</div>
      </SubscriptionStatus>
    );
  }

  const handleManagePayment = () => {
    window.open(STRIPE_PAYMENT_URL, '_blank');
  };

  return (
    <>
      <SubscriptionStatus>
        <div>Your subscription:</div>
        <div style={{ marginTop: '1rem' }}>
          <StatusBadge $status={subscription.status}>
            {subscription.status.charAt(0).toUpperCase() +
              subscription.status.slice(1)}
          </StatusBadge>
          {subscription.started_at && (
            <div
              style={{
                marginTop: '0.25rem',
                fontSize: '0.875rem',
                color: '#6b7280',
              }}
            >
              Started: {new Date(subscription.started_at).toLocaleDateString()}
            </div>
          )}
          <div
            style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#6b7280',
            }}
          >
            Current Period:{' '}
            {new Date(
              subscription.current_billing_period_started_at
            ).toLocaleDateString()}{' '}
            -{' '}
            {new Date(
              subscription.current_billing_period_ending_at
            ).toLocaleDateString()}
          </div>
        </div>

        <ManagePaymentButton
          onClick={handleManagePayment}
          aria-label='Manage payment method in Stripe'
          tabIndex={0}
        >
          <Icon>💳</Icon>
          Manage Payment Method
        </ManagePaymentButton>
      </SubscriptionStatus>

      {subscription.status === 'active' && (
        <>
          <Separator />
          <Usage
            subscription={subscription}
            customerExternalId={subscription.external_customer_id}
          />
        </>
      )}
    </>
  );
};

export default SubscriptionView;
