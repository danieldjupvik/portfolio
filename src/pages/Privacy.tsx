import { useEffect } from 'react';
import { SubPageHeader } from '../components/SubPageHeader';

const Privacy = () => {
  useEffect(() => {
    document.title = 'MovieWatcht | Privacy Policy';
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
          <p>
            Daniel Djupvik Sætre built the MovieWatcht app as a Free app. This
            SERVICE is provided by Daniel Djupvik Sætre at no cost and is intended
            for use as is.
          </p>

          <p>
            This page is used to inform visitors regarding my policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use my Service.
          </p>

          <p>
            If you choose to use my Service, then you agree to the collection and
            use of information in relation to this policy. The Personal Information
            that I collect is used for providing and improving the Service. I will
            not use or share your information with anyone except as described in
            this Privacy Policy.
          </p>

          <h2>Information Collection and Use</h2>
          <p>
            For a better experience, while using our Service, I may require you to
            provide us with certain personally identifiable information. The
            information that I request will be retained on your device and is not
            collected by me in any way.
          </p>

          <p>
            The app does use third party services that may collect information
            used to identify you. Link to privacy policy of third party service
            providers used by the app:
          </p>
          <ul>
            <li>
              <a href='https://expo.io/privacy' target='_blank' rel='noopener noreferrer'>
                Expo
              </a>
            </li>
          </ul>

          <h2>Log Data</h2>
          <p>
            I want to inform you that whenever you use my Service, in a case of an
            error in the app I collect data and information (through third party
            products) on your phone called Log Data. This Log Data may include
            information such as your device Internet Protocol ("IP") address, device
            name, operating system version, the configuration of the app when
            utilizing my Service, the time and date of your use of the Service, and
            other statistics.
          </p>

          <h2>Cookies</h2>
          <p>
            Cookies are files with a small amount of data that are commonly used as
            anonymous unique identifiers. These are sent to your browser from the
            websites that you visit and are stored on your device's internal memory.
          </p>
          <p>
            This Service does not use these "cookies" explicitly. However, the app
            may use third party code and libraries that use "cookies" to collect
            information and improve their services.
          </p>

          <h2>Service Providers</h2>
          <p>
            I may employ third-party companies and individuals due to the following
            reasons:
          </p>
          <ul>
            <li>To facilitate our Service;</li>
            <li>To provide the Service on our behalf;</li>
            <li>To perform Service-related services; or</li>
            <li>To assist us in analyzing how our Service is used.</li>
          </ul>

          <h2>Security</h2>
          <p>
            I value your trust in providing us your Personal Information, thus we
            are striving to use commercially acceptable means of protecting it. But
            remember that no method of transmission over the internet, or method of
            electronic storage is 100% secure and reliable, and I cannot guarantee
            its absolute security.
          </p>

          <h2>Links to Other Sites</h2>
          <p>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by me. Therefore, I strongly advise you
            to review the Privacy Policy of these websites.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            These Services do not address anyone under the age of 13. I do not
            knowingly collect personally identifiable information from children
            under 13 years of age.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            I may update our Privacy Policy from time to time. Thus, you are advised
            to review this page periodically for any changes.
          </p>
          <p>This policy is effective as of 2021-03-21</p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or suggestions about my Privacy Policy, do not
            hesitate to contact me at{' '}
            <a href='mailto:sockets.might-9b@icloud.com'>sockets.might-9b@icloud.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
