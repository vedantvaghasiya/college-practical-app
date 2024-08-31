import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Privacy Policy</title>
         <meta name='description' content='Privacy Policy'/>
            </Helmet>

    <Navbar />
    <div className="min-h-screen text-white bg-black bg-opacity-40">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>

        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          At https://college-practicals.vercel.app/, we collect and manage user data according to the following Privacy Policy.
        </p>

        <p className="mb-4">
          <strong>1. Information You Provide to Us:</strong> We collect information that you provide directly to us.
          For example, we collect information when you create an account, fill out a form, or contact us.
        </p>

        <p className="mb-4">
          <strong>2. Automatically Collected Information:</strong> When you use our website, we may automatically
          collect certain information, including your IP address, device information, and usage information.
        </p>

        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, such as:
        </p>

        <ul className="list-disc ml-6 mb-4">
          <li>Administer your account.</li>
          <li>Process transactions and send transaction notifications.</li>
          <li>Respond to your comments, questions, and requests.</li>
          <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>
        <p className="mb-4">
          We may share your information with third parties when you explicitly consent to the sharing, or as follows:
        </p>

        <ul className="list-disc ml-6 mb-4">
          <li>With service providers who perform services on our behalf.</li>
          <li>With business partners, advertising partners, and social media platforms.</li>
        </ul>

        <p className="mb-4">
          For more details on how we collect, use, and share your personal information, please review our full Privacy Policy.
        </p>

        <p>
          If you have any questions or concerns about our Privacy Policy, please <a href="/contact">contact us</a>.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default PrivacyPolicy;
