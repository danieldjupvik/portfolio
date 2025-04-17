import { useEffect, useRef, useState } from 'react';
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

// Styled components
const UsageContainer = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin: 20px auto;
`;

const Heading = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
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

export const Usage = ({
  subscription,
  customerExternalId,
}: UsageProps): JSX.Element => {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Use a ref to track if we've already made a request for this combination
  const requestMadeRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchUsageData = async (): Promise<void> => {
      if (!subscription || !customerExternalId) {
        setLoading(false);
        return;
      }

      const externalSubscriptionId = subscription.external_id;
      // Create a unique key for this request
      const requestKey = `${customerExternalId}:${externalSubscriptionId}`;

      // Skip if we've already made this exact request
      if (requestMadeRef.current === requestKey) {
        return;
      }

      // Mark that we're making this request
      requestMadeRef.current = requestKey;

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
      } catch (err: any) {
        console.error('Error fetching usage data:', err);
        setError(err.message || 'Failed to fetch usage data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [subscription, customerExternalId]);

  if (loading) {
    return <div>Loading usage data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!usageData) {
    return <div>No usage data available</div>;
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

  return (
    <UsageContainer>
      <Heading>Current Usage</Heading>

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
                {formatCurrency(charge.amount_cents, charge.amount_currency)}
              </div>
            </ChargeDetails>
          </ChargeItem>
        ))}
      </Section>
    </UsageContainer>
  );
};
