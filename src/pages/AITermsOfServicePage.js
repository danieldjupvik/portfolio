import { Link, useNavigate } from 'react-router-dom';
import AITermsOfService from '../components/AITermsOfService';
import useScrollToTop from '../hooks/useScrollToTop';

const AITermsOfServicePage = () => {
  document.title = 'Daniel AI | Terms of Service';
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
          <span className='main__heading--firstWord'>Terms</span> of Service
          <span className='main__heading--dot'>.</span>
        </h1>
      </div>

      <div
        style={{
          color: 'white',
          width: '100%',
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
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Please read these Terms of Service ("Terms") carefully before using
            the Daniel AI service. By using our service, you agree to be bound
            by these Terms.
          </p>
        </div>

        {/* Use the shared Terms of Service component with extended content */}
        <AITermsOfService isExtended={true} />
      </div>

      <div
        style={{
          color: 'white',
          width: '100%',
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
            <Link to='/ai/privacy-policy' style={{ color: '#74f7d9' }}>
              View Privacy Policy
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

export default AITermsOfServicePage;
