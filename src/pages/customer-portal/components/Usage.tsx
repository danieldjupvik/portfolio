import { JSX, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Types
interface Subscription {
  status: string;
  plan_code: string;
  external_id: string;
  external_customer_id: string;
  [key: string]: any;
}

interface UsageProps {
  subscription: Subscription;
  customerExternalId: string;
}

interface UsageData {
  from_datetime: string;
  to_datetime: string;
  issuing_date: string;
  currency: string;
  amount_cents: number;
  total_amount_cents: number;
  taxes_amount_cents: number;
  lago_invoice_id: string | null;
  charges_usage: Array<{
    units: string;
    events_count: number;
    amount_cents: number;
    amount_currency: string;
    charge: {
      lago_id: string;
      charge_model: string;
      invoice_display_name: string;
    };
    billable_metric: {
      lago_id: string;
      name: string;
      code: string;
      aggregation_type: string;
    };
    filters: any[];
    grouped_usage: any[];
  }>;
  timestamp?: string;
}

interface PortalData {
  portal_url: string;
  timestamp: string;
}

// Styled components
const UsageContainer = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin: 20px auto;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const HeadingText = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #2a6b9e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d5a87;
  }

  &:disabled {
    background-color: #9ab8cb;
    cursor: not-allowed;
  }
`;

const PortalButton = styled(Button)`
  background-color: #3e7d44;

  &:hover {
    background-color: #2e5d34;
  }

  &:disabled {
    background-color: #95c49a;
  }
`;

interface IconProps {
  isSpinning: boolean;
}

const Icon = styled.span<IconProps>`
  display: inline-block;
  margin-right: 6px;
  animation: ${(props) =>
    props.isSpinning ? 'spin 1s linear infinite' : 'none'};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LastUpdated = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  text-align: right;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionHeading = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
`;

const Amount = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #2a6b9e;
`;

const ChargeItem = styled.div`
  padding: 10px;
  border-left: 3px solid #2a6b9e;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChargeName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ChargeDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  font-size: 14px;
`;

const Label = styled.span`
  font-weight: 500;
  color: #666;
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
  padding: 20px;
`;

const LoadingText = styled.p`
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  padding: 20px;
  text-align: center;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  background-color: #fef2f2;
  margin: 20px 0;
`;

const NoDataMessage = styled.div`
  color: #6b7280;
  padding: 20px;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  margin: 20px 0;
`;

export const Usage = ({
  subscription,
  customerExternalId,
}: UsageProps): JSX.Element => {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [portalUrl, setPortalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingPortal, setLoadingPortal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  // Use a ref to track if we've already made a request for this combination
  const requestMadeRef = useRef<string | null>(null);

  const fetchUsageData = async (isRefreshing = false): Promise<void> => {
    if (!subscription || !customerExternalId) {
      setLoading(false);
      return;
    }

    const externalSubscriptionId = subscription.external_id;
    // Create a unique key for this request
    const requestKey = `${customerExternalId}:${externalSubscriptionId}`;

    // Skip if we've already made this exact request and not refreshing
    if (requestMadeRef.current === requestKey && !isRefreshing) {
      return;
    }

    // Mark that we're making this request
    requestMadeRef.current = requestKey;

    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch(
        `/api/usage?externalCustomerId=${customerExternalId}&externalSubscriptionId=${externalSubscriptionId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch usage data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setUsageData(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Error fetching usage data:', err);
      setError(err.message || 'Failed to fetch usage data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchPortalUrl = async (): Promise<void> => {
    if (!customerExternalId) {
      return;
    }

    setLoadingPortal(true);
    setPortalError(null);

    try {
      const response = await fetch(
        `/api/customer-portal?externalCustomerId=${customerExternalId}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch portal URL: ${response.status} ${response.statusText}`
        );
      }

      const data: PortalData = await response.json();
      setPortalUrl(data.portal_url);
    } catch (err: any) {
      console.error('Error fetching customer portal URL:', err);
      setPortalError(err.message || 'Failed to fetch customer portal URL');
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleRefresh = (): void => {
    setError(null);
    fetchUsageData(true);
  };

  const handleOpenPortal = async (): Promise<void> => {
    // If we already have the portal URL, open it directly
    if (portalUrl) {
      window.open(portalUrl, '_blank');
      return;
    }

    // Otherwise, fetch the URL first
    try {
      await fetchPortalUrl();
      // The URL will be opened after the state is updated and the button is clicked again
    } catch (err) {
      // Error is already handled in fetchPortalUrl
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, [subscription, customerExternalId]);

  // Open the portal URL once it's fetched
  useEffect(() => {
    if (portalUrl && loadingPortal === false) {
      window.open(portalUrl, '_blank');
    }
  }, [portalUrl, loadingPortal]);

  if (loading && !refreshing) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading usage data...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <UsageContainer>
        <HeadingContainer>
          <HeadingText>Current Usage</HeadingText>
          <ActionButtons>
            <Button onClick={handleRefresh} disabled={refreshing}>
              <Icon isSpinning={refreshing}>↻</Icon>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </ActionButtons>
        </HeadingContainer>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </UsageContainer>
    );
  }

  if (!usageData) {
    return (
      <UsageContainer>
        <HeadingContainer>
          <HeadingText>Current Usage</HeadingText>
          <ActionButtons>
            <Button onClick={handleRefresh} disabled={refreshing}>
              <Icon isSpinning={refreshing}>↻</Icon>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </ActionButtons>
        </HeadingContainer>
        <NoDataMessage>No usage data available</NoDataMessage>
      </UsageContainer>
    );
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amountInCents: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
    }).format(amountInCents / 100);
  };

  const formatLastUpdated = (date: Date): string => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <UsageContainer>
      <HeadingContainer>
        <HeadingText>Current Usage</HeadingText>
        <ButtonsContainer>
          <ActionButtons>
            <Button onClick={handleRefresh} disabled={refreshing}>
              <Icon isSpinning={refreshing}>↻</Icon>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <PortalButton
              onClick={handleOpenPortal}
              disabled={loadingPortal}
              aria-label='Open Lago customer portal in a new tab'
              tabIndex={0}
            >
              <Icon isSpinning={loadingPortal}>↗</Icon>
              {loadingPortal ? 'Loading...' : 'Open Portal'}
            </PortalButton>
          </ActionButtons>
          {portalError && (
            <ErrorMessage>Portal error: {portalError}</ErrorMessage>
          )}
          {lastUpdated && (
            <LastUpdated>
              Last updated: {formatLastUpdated(lastUpdated)}
            </LastUpdated>
          )}
        </ButtonsContainer>
      </HeadingContainer>

      {refreshing && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Refreshing usage data...</LoadingText>
        </LoadingContainer>
      )}

      {!refreshing && (
        <>
          <Section>
            <SectionHeading>Billing Period</SectionHeading>
            <p>
              {formatDate(usageData.from_datetime)} to{' '}
              {formatDate(usageData.to_datetime)}
            </p>
          </Section>

          <Section>
            <SectionHeading>Total Amount</SectionHeading>
            <Amount>
              {formatCurrency(usageData.total_amount_cents, usageData.currency)}
            </Amount>
          </Section>

          <Section>
            <SectionHeading>Usage Breakdown</SectionHeading>
            {usageData.charges_usage.map((charge, index) => (
              <ChargeItem key={index}>
                <ChargeName>
                  {charge.charge.invoice_display_name ||
                    charge.billable_metric.name}
                </ChargeName>
                <ChargeDetails>
                  <div>
                    <Label>Units:</Label> {parseFloat(charge.units).toFixed(6)}
                  </div>
                  <div>
                    <Label>Events:</Label> {charge.events_count}
                  </div>
                  <div>
                    <Label>Amount:</Label>{' '}
                    {formatCurrency(
                      charge.amount_cents,
                      charge.amount_currency
                    )}
                  </div>
                </ChargeDetails>
              </ChargeItem>
            ))}
          </Section>
        </>
      )}
    </UsageContainer>
  );
};
