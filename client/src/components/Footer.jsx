import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="container mx-auto">
        <div>
          <p className="text-sm">
            &copy; {currentYear} <a href="https://college-practicals.vercel.app/">College Practicals Hub</a>
          </p>
        </div>
        <div>
          <p className="text-sm">
            This website is for informational purposes only. Any reliance you place on such information is strictly at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
