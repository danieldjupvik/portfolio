import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SubPageHeader } from '../components/SubPageHeader';
import AITermsOfService from '../components/AITermsOfService';

const AITermsOfServicePage = () => {
  useEffect(() => {
    document.title = 'Daniel AI | Terms of Service';
  }, []);

  return (
    <div className='subpage'>
      <SubPageHeader />

      <div className='subpage-content'>
        <h1 className='subpage-title'>
          <span className='subpage-title__accent'>Terms</span> of Service
          <span className='subpage-title__dot'>.</span>
        </h1>

        <div className='subpage-text'>
          <p><em>Last Updated: January 15, 2025</em></p>
          <p>
            Please read these Terms of Service carefully before using the Daniel AI
            service. By using our service, you agree to be bound by these Terms.
          </p>

          <AITermsOfService isExtended={true} />
        </div>

        <div className='subpage-footer'>
          <p>
            <Link to='/ai'>Back to Daniel AI</Link>
            {' · '}
            <Link to='/ai/privacy-policy'>Privacy Policy</Link>
          </p>
          <p style={{ marginTop: '1rem' }}>© {new Date().getFullYear()} Daniel AI</p>
        </div>
      </div>
    </div>
  );
};

export default AITermsOfServicePage;
