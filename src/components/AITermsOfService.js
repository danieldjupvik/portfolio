import React from 'react';

// This component contains shared terms of service content
// It can be imported and used on both the AI page and the dedicated terms page
// The isExtended prop determines whether to show the extended version

const AITermsOfService = ({ isExtended = false }) => {
  return (
    <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>1. Service Description</h3>
        <p style={{ marginBottom: '15px' }}>
          We provide access to AI capabilities through a cost-sharing model. We
          are not the AI service provider but rather facilitate access to
          third-party AI services.
        </p>
        {isExtended && (
          <p style={{ marginBottom: '15px' }}>
            Our platform connects you to various AI models and capabilities
            without requiring individual subscriptions to each service. We
            handle the technical integration and billing complexities, allowing
            you to focus on using the AI capabilities for your needs.
          </p>
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>2. Usage Terms</h3>
        <p style={{ marginBottom: '15px' }}>
          Users must adhere to the terms and conditions of the underlying AI
          provider. Any misuse or violation of those terms may result in
          termination of access.
        </p>
        {isExtended && (
          <>
            <p style={{ marginBottom: '15px' }}>
              Prohibited uses include but are not limited to:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
              <li style={{ marginBottom: '10px' }}>
                Generating content that violates any applicable laws or
                regulations
              </li>
              <li style={{ marginBottom: '10px' }}>
                Using the service to produce harmful, abusive, or deceptive
                content
              </li>
              <li style={{ marginBottom: '10px' }}>
                Attempting to reverse engineer or extract the underlying AI
                models
              </li>
              <li style={{ marginBottom: '10px' }}>
                Distributing access to the service to unauthorized users
              </li>
              <li style={{ marginBottom: '10px' }}>
                Engaging in activities that could damage, disable, or impair the
                service
              </li>
            </ul>
          </>
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>3. User Conduct</h3>
        <p style={{ marginBottom: '15px' }}>
          When using our AI service, you agree NOT to:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <li style={{ marginBottom: '10px' }}>
            Violate any applicable laws, regulations, or these Terms
          </li>
          <li style={{ marginBottom: '10px' }}>
            Use the Service for any unlawful, harmful, threatening, abusive,
            harassing, defamatory, or otherwise objectionable purpose
          </li>
          <li style={{ marginBottom: '10px' }}>
            Attempt to gain unauthorized access to, interfere with, or disrupt
            any servers or networks connected to our service
          </li>
          <li style={{ marginBottom: '10px' }}>
            Transmit viruses, malware, or other malicious code that could harm
            our service, users, or third parties
          </li>
          <li style={{ marginBottom: '10px' }}>
            Collect or harvest any personal data about other users
          </li>
          <li style={{ marginBottom: '10px' }}>
            Use our service to generate or share content that infringes on any
            intellectual property or privacy rights of a third party
          </li>
        </ul>
        {isExtended && (
          <p style={{ marginBottom: '15px' }}>
            Violation of these guidelines may result in the suspension or
            termination of your access to our service, and in serious cases, may
            subject you to legal liability.
          </p>
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>4. Billing</h3>
        <p style={{ marginBottom: '15px' }}>
          Users are billed monthly based on actual usage. Invoices are generated
          at the end of each billing cycle, and payment is due within 15 days.
        </p>
        {isExtended && (
          <>
            <p style={{ marginBottom: '15px' }}>
              Our billing system tracks your usage of the AI services throughout
              the month. Usage metrics include:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
              <li style={{ marginBottom: '10px' }}>
                Number of API calls or requests
              </li>
              <li style={{ marginBottom: '10px' }}>
                Computational resources consumed
              </li>
              <li style={{ marginBottom: '10px' }}>Data transfer volume</li>
              <li style={{ marginBottom: '10px' }}>
                Storage usage (if applicable)
              </li>
            </ul>
            <p style={{ marginBottom: '15px' }}>
              Late payments may result in service interruption. We offer various
              payment methods including credit cards, bank transfers, and
              selected digital payment platforms.
            </p>
          </>
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>5. Cancellation</h3>
        <p style={{ marginBottom: '15px' }}>
          Users may cancel their service at any time. Upon cancellation, access
          to AI capabilities will be terminated, and a final invoice for any
          outstanding usage will be issued.
        </p>
        {isExtended && (
          <p style={{ marginBottom: '15px' }}>
            To cancel your service, please send an email to our support team{' '}
            <a
              href='mailto:sockets.might-9b@icloud.com'
              style={{ color: '#74f7d9' }}
            >
              sockets.might-9b@icloud.com
            </a>
            . Once we receive your cancellation request, we will process it
            within 2 business days. You will have access to the service until
            the end of your current billing period.
          </p>
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>6. Liability</h3>
        <p style={{ marginBottom: '15px' }}>
          We are not responsible for the performance or availability of the
          underlying AI services. We make no warranties or guarantees regarding
          the accuracy, reliability, or suitability of the AI outputs for any
          particular purpose.
        </p>
        {isExtended && (
          <>
            <p style={{ marginBottom: '15px' }}>
              Our service is provided on an "as is" and "as available" basis. We
              disclaim all warranties of any kind, whether express or implied,
              including but not limited to:
            </p>
            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
              <li style={{ marginBottom: '10px' }}>Merchantability</li>
              <li style={{ marginBottom: '10px' }}>
                Fitness for a particular purpose
              </li>
              <li style={{ marginBottom: '10px' }}>Non-infringement</li>
              <li style={{ marginBottom: '10px' }}>
                Uninterrupted or error-free service
              </li>
            </ul>
            <p style={{ marginBottom: '15px' }}>
              In no event shall we be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of
              profits, data, or business opportunities, arising out of or in
              connection with your use of our service.
            </p>
          </>
        )}
      </section>

      <section style={{ marginBottom: isExtended ? '30px' : '0' }}>
        <h3 style={{ marginBottom: '15px' }}>7. Data Privacy</h3>
        <p style={{ marginBottom: '15px' }}>
          We collect and process only the data necessary to provide our services
          and for billing purposes. We do not access or retain the content
          processed by the AI services.
        </p>
        {isExtended && (
          <>
            <p style={{ marginBottom: '15px' }}>
              For complete information about our data practices, please refer to
              our
              <a
                href='/ai/privacy-policy'
                style={{ color: '#74f7d9', marginLeft: '5px' }}
              >
                Privacy Policy
              </a>
              .
            </p>
          </>
        )}
      </section>

      {isExtended && (
        <>
          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>8. Intellectual Property</h3>
            <p style={{ marginBottom: '15px' }}>
              All intellectual property rights in the service and its content
              (excluding content provided by users) belong to us or our
              licensors.
            </p>
            <p style={{ marginBottom: '15px' }}>
              You retain all rights to the content you process through our
              service. However, you grant us a non-exclusive, royalty-free
              license to use, store, and process your content solely for the
              purpose of providing the service to you.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>9. Service Modifications</h3>
            <p style={{ marginBottom: '15px' }}>
              We reserve the right to modify, suspend, or discontinue our
              service, temporarily or permanently, at any time without notice.
              We will not be liable to you or any third party for any
              modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>10. Dispute Resolution</h3>
            <p style={{ marginBottom: '15px' }}>
              Any disputes arising out of or relating to these terms or your use
              of our service shall be resolved through binding arbitration in
              accordance with the laws of the jurisdiction in which our company
              is registered.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>11. Changes to Terms</h3>
            <p style={{ marginBottom: '15px' }}>
              We may update these terms from time to time. We will notify you of
              any changes by posting the new terms on this page. Your continued
              use of the service after the changes have been posted constitutes
              your acceptance of the modified terms.
            </p>
          </section>

          <section style={{ marginBottom: '0' }}>
            <h3 style={{ marginBottom: '15px' }}>12. Contact Information</h3>
            <p style={{ marginBottom: '15px' }}>
              If you have any questions about these terms, please contact us at{' '}
              <a
                href='mailto:sockets.might-9b@icloud.com'
                style={{ color: '#74f7d9' }}
              >
                sockets.might-9b@icloud.com
              </a>
              .
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default AITermsOfService;
