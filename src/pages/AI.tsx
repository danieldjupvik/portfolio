import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubPageHeader } from '../components/SubPageHeader';
import AITermsOfService from '../components/AITermsOfService';

const AI = () => {
  const [contactEmail, setContactEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Daniel AI | Your AI Usage Solution';
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Contact form submitted:', { contactEmail, message });
    setSubmitted(true);
    setContactEmail('');
    setMessage('');
  };

  return (
    <div className='subpage'>
      <SubPageHeader />

      <div className='subpage-content'>
        <h1 className='subpage-title'>
          <span className='subpage-title__accent'>Daniel</span> AI
          <span className='subpage-title__dot'>.</span>
        </h1>

        <div className='ai-hero'>
          <h2>Pay Only For The AI You Actually Use</h2>
          <p>
            Our Daniel AI service provides cost-effective access to premium AI
            capabilities. We cover the upfront costs, and you only pay for your
            actual usage, billed monthly. No subscriptions, no minimum commitments.
          </p>
          <a href='#contact-section' className='ai-cta'>
            Get Started Today
          </a>
        </div>

        <section className='ai-section'>
          <h2>How It Works</h2>
          <div className='ai-steps'>
            <div className='ai-step'>
              <span className='ai-step__number'>1</span>
              <div>
                <h3>Sign Up For Access</h3>
                <p>Register to get immediate access to premium AI capabilities.</p>
              </div>
            </div>
            <div className='ai-step'>
              <span className='ai-step__number'>2</span>
              <div>
                <h3>Use The AI Resources</h3>
                <p>Utilize the AI services whenever you need them. No restrictions.</p>
              </div>
            </div>
            <div className='ai-step'>
              <span className='ai-step__number'>3</span>
              <div>
                <h3>Pay Only For What You Use</h3>
                <p>Monthly invoice based on actual usage. No minimum fees.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='ai-section'>
          <h2>Pricing & Billing</h2>
          <div className='ai-pricing'>
            <h3>Usage-Based Pricing</h3>
            <p>Simple and transparent. Pay only for what you use.</p>
            <ul className='ai-features'>
              <li>Usage tracked throughout the month</li>
              <li>Monthly invoice based on actual usage</li>
              <li>Payment processed automatically</li>
              <li>Detailed usage reports provided</li>
              <li>Cancel anytime with no penalties</li>
            </ul>
          </div>
        </section>

        <section className='ai-section'>
          <h2>Terms & Conditions</h2>
          <div className='subpage-text'>
            <AITermsOfService isExtended={false} />
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to='/ai/terms-of-service'>Full Terms of Service</Link>
            {' · '}
            <Link to='/ai/privacy-policy'>Privacy Policy</Link>
          </p>
        </section>

        <section className='ai-section' id='contact-section'>
          <h2>Contact Us</h2>
          {submitted ? (
            <div className='ai-success'>
              <h3>Thank you for reaching out!</h3>
              <p>We've received your message and will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='ai-form'>
              <div className='ai-form__field'>
                <label htmlFor='email'>Email Address</label>
                <input
                  type='email'
                  id='email'
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div className='ai-form__field'>
                <label htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />
              </div>
              <button type='submit' className='ai-cta'>
                Send Message
              </button>
            </form>
          )}
          <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            Or email us at <a href='mailto:sockets.might-9b@icloud.com'>sockets.might-9b@icloud.com</a>
          </p>
        </section>

        <div className='subpage-footer'>
          <p>© {new Date().getFullYear()} Daniel AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AI;
