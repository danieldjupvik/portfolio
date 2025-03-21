import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AITermsOfService from '../components/AITermsOfService';

const AI = () => {
  document.title = 'Daniel AI | Your AI Usage Solution';
  const navigate = useNavigate();
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const goBack = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Contact form submitted:', { contactEmail, message });
    setSubmitted(true);
    setContactEmail('');
    setMessage('');
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
          <span className='main__heading--firstWord'>Daniel</span> AI
          <span className='main__heading--dot'>.</span>
        </h1>
      </div>

      {/* Hero Section */}
      <div
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '40px auto',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <h2>Pay Only For The AI You Actually Use</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginTop: '20px' }}>
          Our Daniel AI service provides cost-effective access to premium AI
          capabilities. We cover the upfront costs, and you only pay for your
          actual usage, billed monthly. No subscriptions, no minimum commitments
          - just pay for what you use.
        </p>
        <button
          style={{
            background: '#74f7d9',
            color: '#1d1d1d',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '5px',
            fontSize: '16px',
            marginTop: '30px',
            cursor: 'pointer',
          }}
          onClick={() =>
            document
              .getElementById('contact-section')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          Get Started Today
        </button>
      </div>

      {/* How It Works Section */}
      <div
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '60px auto',
          padding: '20px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          How It Works
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div
            style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}
          >
            <div
              style={{
                minWidth: '50px',
                width: '50px',
                height: '50px',
                backgroundColor: '#74f7d9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1d1d1d',
              }}
            >
              1
            </div>
            <div>
              <h3>Sign Up For Access</h3>
              <p>
                Register for our Daniel AI service to get immediate access to
                premium AI capabilities.
              </p>
            </div>
          </div>

          <div
            style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}
          >
            <div
              style={{
                minWidth: '50px',
                width: '50px',
                height: '50px',
                backgroundColor: '#74f7d9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1d1d1d',
              }}
            >
              2
            </div>
            <div>
              <h3>Use The AI Resources</h3>
              <p>
                Utilize the AI services through our platform whenever you need
                them. No restrictions on usage amount.
              </p>
            </div>
          </div>

          <div
            style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}
          >
            <div
              style={{
                minWidth: '50px',
                width: '50px',
                height: '50px',
                backgroundColor: '#74f7d9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1d1d1d',
              }}
            >
              3
            </div>
            <div>
              <h3>Pay Only For What You Use</h3>
              <p>
                At the end of each month, you'll receive an invoice based on
                your actual usage. No minimum fees or subscriptions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '60px auto',
          padding: '20px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Pricing & Billing
        </h2>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <h3>Usage-Based Pricing</h3>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginTop: '15px' }}>
            Our pricing is simple and transparent. You only pay for what you
            actually use. No upfront costs, no subscriptions, and no hidden
            fees.
          </p>
          <div style={{ margin: '30px 0' }}>
            <h4>How You're Billed:</h4>
            <ul
              style={{
                textAlign: 'left',
                maxWidth: '500px',
                margin: '0 auto',
                listStyleType: 'none',
              }}
            >
              <li
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#74f7d9', marginRight: '10px' }}>✓</span>{' '}
                Usage is tracked throughout the month
              </li>
              <li
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#74f7d9', marginRight: '10px' }}>✓</span>{' '}
                Monthly invoice generated based on actual usage
              </li>
              <li
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#74f7d9', marginRight: '10px' }}>✓</span>{' '}
                Payment processed automatically
              </li>
              <li
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#74f7d9', marginRight: '10px' }}>✓</span>{' '}
                Detailed usage reports provided
              </li>
              <li
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#74f7d9', marginRight: '10px' }}>✓</span>{' '}
                Cancel anytime with no penalties
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Section */}
      <div
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '60px auto',
          padding: '20px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Terms & Conditions
        </h2>
        <AITermsOfService isExtended={false} />
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p>
            For the complete terms of service, please visit our{' '}
            <Link to='/ai/terms-of-service' style={{ color: '#74f7d9' }}>
              Terms of Service
            </Link>{' '}
            page.
          </p>
          <p style={{ marginTop: '10px' }}>
            To learn about how we handle your data, view our{' '}
            <Link to='/ai/privacy-policy' style={{ color: '#74f7d9' }}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div
        id='contact-section'
        style={{
          color: 'white',
          maxWidth: '800px',
          margin: '60px auto',
          padding: '20px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
          Contact Us
        </h2>
        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '30px',
              background: 'rgba(0, 123, 255, 0.1)',
              borderRadius: '10px',
            }}
          >
            <h3>Thank you for reaching out!</h3>
            <p>We've received your message and will get back to you shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div>
              <label
                htmlFor='email'
                style={{ display: 'block', marginBottom: '8px' }}
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #444',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }}
              />
            </div>
            <div>
              <label
                htmlFor='message'
                style={{ display: 'block', marginBottom: '8px' }}
              >
                Message
              </label>
              <textarea
                id='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #444',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  resize: 'vertical',
                }}
              ></textarea>
            </div>
            <button
              type='submit'
              style={{
                background: '#74f7d9',
                color: '#1d1d1d',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              Send Message
            </button>
          </form>
        )}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p>
            For immediate assistance, email us at:{' '}
            <a
              href='mailto:sockets.might-9b@icloud.com'
              style={{ color: '#74f7d9' }}
            >
              sockets.might-9b@icloud.com
            </a>
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '50px 0', color: 'white' }}>
        <p>© {new Date().getFullYear()} Daniel AI. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AI;
