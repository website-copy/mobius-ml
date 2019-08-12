import React from 'react'
import Layout from '../components/layout'
import './privacy-policy.module.css'

const PrivacyPolicyPage = (props) => (
  <Layout {...props}>
    <section styleName='privacy-policy-page' className='sm-gutters'>
      <div className='container'>
        <h2>Privacy Policies</h2>
        <p>
          The data protection declaration for our demo app can be found here:
        </p>
        <a
          href='https://mobius.ml/privacy-policy-app'>Privacy Policy for Demo App</a>
        <p> </p>
        <h2>Data Protection Declaration Website</h2>
        <p>
          This Website (<a href='https://mobius.ml'>mobius.ml</a>) is provided by Mobius Labs GmbH (hereinafter referred to as "Provider"). Responsible body according to § 3 Section 7 BDSG and service provider according to § 13 TMG. Further information on the Provider is given in the imprint.
        </p>
        <p>
          Version 0.1.1, September 4, 2018
        </p>
        <p>
          We adhere to the requirements of the Federal Data Protection Act (BDSG), the Telemedia Act (TMG), and all relevant European regulations.
          In this Data Protection Declaration our users will be referred to collectively as "User".
          In the following the Provider informs the User of the nature, scope and purpose of collecting, processing and use of personal data. Users can access the present Data Protection Statement at any time inside the Website.
          Data protection is important to us. You can therefore be confident that we will handle your data sensitively and according to the regulations.
        </p>
        <h3>
          1. Collection, processing and use of personal data
        </h3>
        <p>
          We will collect, process, and use the personal data provided with your consent only for the purposes disclosed to you.
        </p>
        <p>
          a) When visiting the website
          <br />
          You may access the website mobius.ml without having to disclose any details of your identity. What the browser on your terminal device does automatically is only to send information to the server of our website (e.g. browser type and version, date and time of access) so as to allow a connection with the website. This also includes the IP address of your requesting terminal device. It is temporarily stored in a so-called log file and automatically deleted after 4 days:
          <br />
          The IP address is processed for technical and administrative purposes regarding connection set-up and stability, to guarantee the security and functioning of our website and to be able to track any illegal attacks on the website, if required.
          <br />
          The legal basis for processing the IP address is the first sentence of point (f) of Article 6(1) GDPR. Our legitimate interest ensues from said security interest and the necessity of the unobstructed availability of our website.
          <br />
          We cannot draw any direct conclusions about your identity from processing the IP address and other information in the log file.
        </p>
        <p>
          b) When using the contact form
          <br />
          For queries addressed to our sales team, we offer you the option of contacting us directly by means of a contact form provided on the website.
        </p>
        <p>
          The following data are necessary as mandatory data:
        </p>
        <ul>
          <li>First name and surname</li>
          <li> Company</li>
          <li> Country</li>
          <li> Email address and</li>
          <li> Your query</li>
        </ul>
        <p>
          We require your data to determine that the query has come from a company and to be able to answer and process it. The data is processed exclusively for processing your query and is not taken into account for any future award procedure.
        </p>
        <p>
          The processing of data takes place upon your request and is within the framework of answering a contact request supported by our legitimate interest pursuant to the first sentence of point (f) of Article 6(1) GDPR.
        </p>
        <p>
          The personal data collected by us when you use the contact form will be deleted after completion of your query.
        </p>
        <h3>
          2. Transfer of personal data to third parties
        </h3>
        <p>
          We forward your personal data to third parties only if:
        </p>
        <ul>
          <li>
            you have given your express consent pursuant to the first sentence of point (a) of Article 6(1) GDPR,
          </li>
          <li>
            it is necessary for the performance of a contract with you pursuant to the first sentence of point (b) of Article 6(1) GDPR,
          </li>
          <li>
            a statutory obligation exists for transferring pursuant to the first sentence of point (c) of Article 6(1) GDPR.
          </li>
        </ul>
        <p>
          Sending personal data to a third country (outside the EU) or an international organisation is excluded.
        </p>
        <h3>
          3. Data secrecy
        </h3>
        <p>
          We have appropriate technical and organizational measures in place in order to protect any personal data that is collected, processed and used by us and that shall prevent loss, unauthorized collection, processing and use of such data.
        </p>
        <h3>
          4. Data subjects’ rights (according to EU-GDPR)
        </h3>
        <p>
          The data subject has the following rights:
          <br />Right to information
          <br />Right to withdraw given consent at any time (Article 7(3) GDPR)
          <br />Right of access (Art.15 GDPR)
          <br />Right to rectification (Art. 16 GDPR)
          <br />Right to erasure (Art. 17 EU-GDPR)
          <br />Right to restriction of processing (Art. 18 GDPR)
          <br />Right to data portability (Art.20 GDPR)
          <br />Right to object (Art. 21 GDPR)
        </p>
        <h3>
          5. Right to file complaints with regulatory authorities (Article 77 GDPR)
        </h3>
        <p>
          If there has been a breach of data protection legislation, the person
          affected may file a complaint with the competent regulatory
          authorities.  The competent regulatory authority for matters related
          to data protection legislation is the data protection officer of the
          German state in which our company is headquartered. A list of data
          protection officers and their contact details can be found at the
          following link: <a
          href='https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html'>Contact
          information to German authorities</a>
        </p>
        <h3>
          6. Amendment of this data protection declaration
        </h3>
        <p>
          We reserve the right to update this data protection declaration at
          regular intervals in accordance with the development of the underlying
          procedures/processes. You may always access and print the latest data
          protection information on the website at <a
          href='https://mobius.ml/privacy-policy'>Mobius Privacy Policy</a>
        </p>
        <h3>
          Responsible for the content:
        </h3>
        <p>
          Frau Isabel Schwende
          <br />Data Protection Officer
          <br />Mobius Labs GmbH
          <br />Kohlfurterstrasse 41/43
          <br />10999, Berlin
        </p>
        <h3>
          Data Protection Contact
        </h3>
        <p>
          In case you have any questions about data protection law or your
          rights as the data subject, you may directly contact our Data
          Protection Officer. Email: <a
          href='mailto:datenschutz@mobius.ml'>datenschutz@mobius.ml</a>
        </p>
      </div>
    </section>
  </Layout>
)

export default PrivacyPolicyPage
