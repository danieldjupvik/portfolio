import { Link, useNavigate } from 'react-router-dom';
import useScrollToTop from '../hooks/useScrollToTop';

const AIPrivacyPolicy = () => {
  document.title = 'Daniel AI | Privacy Policy';
  const navigate = useNavigate();
  const { BackToTopButton } = useScrollToTop();

  const goBack = () => {
    navigate('/ai');
  };

  return (
    <div className='container'>
      <div style={{ color: 'white', marginTop: '30px' }}>
        <div onClick={goBack} style={{ cursor: 'pointer' }}>
          Go back
        </div>
      </div>

      <div className='main__heading'>
        <h1 className='main__heading--h1'>
          <span className='main__heading--firstWord'>Privacy</span> Policy
          <span className='main__heading--dot'>.</span>
        </h1>
      </div>

      <div
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '40px auto',
          padding: '20px',
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>1. Introduction</h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            Daniel AI ("we," "our," or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our AI services.
          </p>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            Please read this privacy policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access our services.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>2. Information We Collect</h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We collect information that you provide directly to us when you use
            our services:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              <strong>Account Information:</strong> When you register for our
              service, we collect your name, email address, and billing
              information.
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              <strong>Usage Data:</strong> We collect information about your
              usage of our AI services, including the number of requests,
              timestamps, and the nature of your interactions with our service.
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              <strong>Billing Information:</strong> We collect payment details
              necessary to process your payments for our services.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>
            3. How We Use Your Information
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We use the information we collect for various purposes, including
            to:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Provide, maintain, and improve our services
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Process transactions and send related information including
              confirmations and invoices
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Track your usage for billing purposes
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Send administrative information, such as updates, security alerts,
              and support messages
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Respond to your comments, questions, and requests
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>
            4. Data Storage and Protection
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We do not access or retain the content processed by the AI services.
            We only store the metadata needed for billing and service
            improvement purposes.
          </p>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We implement appropriate technical and organizational measures to
            protect the data we collect and process.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>5. Sharing Your Information</h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We may share your information in the following circumstances:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              With third-party service providers that perform services on our
              behalf, such as payment processing
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              If required by law or in response to valid requests by public
              authorities
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              To protect our rights, privacy, safety, or property
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              In connection with a business transfer, such as a merger or
              acquisition
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>6. Your Rights and Choices</h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            You have certain rights regarding your personal information:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Access and update your personal information
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Request deletion of your personal information
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Object to the processing of your personal information
            </li>
            <li
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                marginBottom: '10px',
              }}
            >
              Request a copy of your personal information
            </li>
          </ul>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            To exercise these rights, please contact us at{' '}
            <a
              href='mailto:sockets.might-9b@icloud.com'
              style={{ color: '#74f7d9' }}
            >
              sockets.might-9b@icloud.com
            </a>
            .
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>
            7. Changes to This Privacy Policy
          </h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new privacy policy on this page
            and updating the "Last Updated" date.
          </p>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            We recommend that you review this privacy policy periodically for
            any changes.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>8. Contact Us</h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px',
            }}
          >
            If you have any questions about this privacy policy, please contact
            us at{' '}
            <a
              href='mailto:sockets.might-9b@icloud.com'
              style={{ color: '#74f7d9' }}
            >
              sockets.might-9b@icloud.com
            </a>
            .
          </p>
        </section>
      </div>

      <div
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '0 auto 40px',
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>
            <Link to='/ai' style={{ color: '#74f7d9' }}>
              Back to Daniel AI
            </Link>
          </p>
          <p>
            <Link to='/ai/terms-of-service' style={{ color: '#74f7d9' }}>
              View Terms of Service
            </Link>
          </p>
        </div>
      </div>

      <BackToTopButton />

      <div style={{ textAlign: 'center', padding: '50px 0', color: 'white' }}>
        <p>© {new Date().getFullYear()} Daniel AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AIPrivacyPolicy;
