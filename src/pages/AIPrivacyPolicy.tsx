import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubPageHeader } from '../components/SubPageHeader';

const AIPrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Daniel AI | Privacy Policy';
  }, []);

  return (
    <div className='subpage'>
      <SubPageHeader />

      <div className='subpage-content'>
        <h1 className='subpage-title'>
          <span className='subpage-title__accent'>Privacy</span> Policy
          <span className='subpage-title__dot'>.</span>
        </h1>

        <div className='subpage-text'>
          <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

          <h2>1. Introduction</h2>
          <p>
            Daniel AI ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our AI services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, and billing information.</li>
            <li><strong>Usage Data:</strong> Number of requests, timestamps, and interaction data.</li>
            <li><strong>Billing Information:</strong> Payment details for processing payments.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send invoices</li>
            <li>Track your usage for billing purposes</li>
            <li>Send administrative information and security alerts</li>
            <li>Respond to your questions and requests</li>
          </ul>

          <h2>4. Data Storage and Protection</h2>
          <p>
            We do not access or retain the content processed by the AI services.
            We only store metadata needed for billing and service improvement.
          </p>

          <h2>5. Sharing Your Information</h2>
          <p>We may share your information:</p>
          <ul>
            <li>With third-party service providers (e.g., payment processing)</li>
            <li>If required by law</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transfer</li>
          </ul>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Object to processing</li>
            <li>Request a copy of your data</li>
          </ul>
          <p>
            Contact us at <a href='mailto:sockets.might-9b@icloud.com'>sockets.might-9b@icloud.com</a> to exercise these rights.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you by
            updating the "Last Updated" date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            Questions? Contact us at <a href='mailto:sockets.might-9b@icloud.com'>sockets.might-9b@icloud.com</a>.
          </p>
        </div>

        <div className='subpage-footer'>
          <p>
            <Link to='/ai'>Back to Daniel AI</Link>
            {' · '}
            <Link to='/ai/terms-of-service'>Terms of Service</Link>
          </p>
          <p style={{ marginTop: '1rem' }}>© {new Date().getFullYear()} Daniel AI</p>
        </div>
      </div>
    </div>
  );
};

export default AIPrivacyPolicy;
