import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Type definitions
interface Subscription {
  id?: string;
  name?: string;
  status?: string;
  created_at?: string;
  [key: string]: any; // For other potential properties
}

interface SubscriptionDetailProps {
  $hasMargin?: boolean;
}

interface StatusBadgeProps {
  $status?: string;
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

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.div`
  padding: 1rem 0;
  color: #666;
`;

const ErrorContainer = styled.div`
  padding: 1rem 0;
`;

const ErrorAlert = styled.div`
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ErrorFlex = styled.div`
  display: flex;
`;

const ErrorIcon = styled.div`
  flex-shrink: 0;
`;

const ErrorContent = styled.div`
  margin-left: 0.75rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #b91c1c;
`;

const ErrorDetail = styled.p`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #dc2626;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

const EmptyMessage = styled.p`
  padding: 1rem 0;
  color: #666;
`;

const SubscriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubscriptionItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

const SubscriptionName = styled.h3`
  font-weight: 500;
  color: #111827;
`;

const SubscriptionDetails = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const SubscriptionDetail = styled.p<SubscriptionDetailProps>`
  margin-top: ${(props) => (props.$hasMargin ? '0.25rem' : '0')};
`;

const StatusBadge = styled.span<StatusBadgeProps>`
  font-weight: 500;
  color: ${(props) => {
    if (props.$status === 'active') return '#059669';
    if (props.$status === 'pending') return '#d97706';
    return '#6b7280';
  }};
`;

const TestResultsCard = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const TestResultsDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const CodeBlock = styled.div`
  background-color: #111827;
  color: #4ade80;
  padding: 1rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
  overflow-x: auto;
`;

const ErrorCodeMessage = styled.p`
  color: #f87171;
`;

const TechnicalDetailsToggle = styled.details`
  margin-top: 0.5rem;
`;

const TechnicalDetailsSummary = styled.summary`
  cursor: pointer;
  color: #9ca3af;
  font-size: 0.75rem;
`;

const TechnicalDetailsContent = styled.pre`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
  white-space: pre-wrap;
`;

const CustomerPortal = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<any>(null);
  const apiCallMadeRef = useRef(false);

  useEffect(() => {
    // Skip duplicate calls in StrictMode
    if (apiCallMadeRef.current) return;

    const fetchSubscriptions = async () => {
      try {
        apiCallMadeRef.current = true;
        setLoading(true);
        console.log('Fetching subscriptions data');

        // Use explicit URL to clarify what's happening
        const apiUrl = '/api/subscriptions';
        const response = await fetch(apiUrl, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `HTTP error! Status: ${response.status}`
          );
        }

        const data = await response.json();
        setRawResponse(data);

        // Handle different response formats
        if (Array.isArray(data)) {
          // Response is already an array
          setSubscriptions(data);
        } else if (data && typeof data === 'object') {
          // If data is an object with a subscriptions property
          if (Array.isArray(data.subscriptions)) {
            setSubscriptions(data.subscriptions);
          } else {
            // If it's just an object, not an array, wrap it in an array
            setSubscriptions([data]);
          }
        } else {
          // Fallback: set as empty array
          setSubscriptions([]);
          console.warn('Unexpected data format:', data);
        }

        setError(null);
        setErrorDetails(null);
      } catch (err: any) {
        console.error('Error fetching subscriptions:', err);
        setSubscriptions([]);
        setError(
          err.message ||
            'Failed to fetch subscriptions. Please try again later.'
        );
        setErrorDetails(err.stack);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []); // Empty dependency array to run only once

  const handleRetry = () => {
    setError(null);
    setErrorDetails(null);
    setRawResponse(null);
    setLoading(true);
    // Rerun the effect by forcing a re-render
    setSubscriptions([]);
  };

  // Safely check if subscriptions is an array before mapping
  const renderSubscriptions = () => {
    if (!Array.isArray(subscriptions)) {
      return <EmptyMessage>Invalid data format received.</EmptyMessage>;
    }

    if (subscriptions.length === 0) {
      return <EmptyMessage>No active subscriptions found.</EmptyMessage>;
    }

    return (
      <SubscriptionList>
        {subscriptions.map((subscription, index) => (
          <SubscriptionItem key={subscription.id || index}>
            <SubscriptionName>
              {subscription.name || 'Subscription'}
            </SubscriptionName>
            <SubscriptionDetails>
              <SubscriptionDetail>
                ID: {subscription.id || 'N/A'}
              </SubscriptionDetail>
              {subscription.status && (
                <SubscriptionDetail $hasMargin>
                  Status:{' '}
                  <StatusBadge $status={subscription.status}>
                    {subscription.status}
                  </StatusBadge>
                </SubscriptionDetail>
              )}
              {subscription.created_at && (
                <SubscriptionDetail $hasMargin>
                  Created:{' '}
                  {new Date(subscription.created_at).toLocaleDateString()}
                </SubscriptionDetail>
              )}
            </SubscriptionDetails>
          </SubscriptionItem>
        ))}
      </SubscriptionList>
    );
  };

  return (
    <Container>
      <Title>Customer Portal</Title>

      <Card>
        <SectionTitle>Your Subscriptions</SectionTitle>

        {loading ? (
          <LoadingMessage>Loading subscriptions...</LoadingMessage>
        ) : error ? (
          <ErrorContainer>
            <ErrorAlert>
              <ErrorFlex>
                <ErrorIcon>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    style={{ color: '#ef4444' }}
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </ErrorIcon>
                <ErrorContent>
                  <ErrorMessage>{error}</ErrorMessage>
                  {error.includes('API key') && (
                    <ErrorDetail>
                      The server is missing authentication credentials. Please
                      ensure the API key is properly configured.
                    </ErrorDetail>
                  )}
                </ErrorContent>
              </ErrorFlex>
            </ErrorAlert>
            <RetryButton
              onClick={handleRetry}
              aria-label='Retry loading subscriptions'
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleRetry()}
            >
              Retry
            </RetryButton>
          </ErrorContainer>
        ) : (
          renderSubscriptions()
        )}
      </Card>

      <TestResultsCard>
        <SectionTitle>API Test Results</SectionTitle>
        <TestResultsDescription>
          This section displays the raw API response:
        </TestResultsDescription>

        <CodeBlock>
          {loading ? (
            <p>Fetching data...</p>
          ) : error ? (
            <div>
              <ErrorCodeMessage>Error: {error}</ErrorCodeMessage>
              {errorDetails && (
                <TechnicalDetailsToggle>
                  <TechnicalDetailsSummary>
                    Technical Details
                  </TechnicalDetailsSummary>
                  <TechnicalDetailsContent>
                    {errorDetails}
                  </TechnicalDetailsContent>
                </TechnicalDetailsToggle>
              )}
            </div>
          ) : (
            <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
          )}
        </CodeBlock>
      </TestResultsCard>
    </Container>
  );
};

export default CustomerPortal;
