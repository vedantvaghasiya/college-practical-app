import React from 'react';
import SubjectListing from '../components/SubjectListing';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Subject = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto  p-4">

        <SubjectListing />

      </div>
      <Footer />
    </>
  );
};

export default Subject;
