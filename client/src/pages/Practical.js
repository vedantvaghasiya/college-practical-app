import React from 'react'
import SubjectPracticals from '../components/PracticalListing'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Practical = () => {
  return (
    <>
    
      <Navbar />
      <div>
        <SubjectPracticals />
      </div>
      <Footer />
    </>


  )
}

export default Practical