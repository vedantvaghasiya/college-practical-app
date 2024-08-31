import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import princeimg from '../img/vedant_don.jpg';

// Add the imported icons to the FontAwesome library
library.add(faLinkedin, faGithub, faInstagram);

const About = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
        <meta name="description" content="About page" />
      </Helmet>

      <Navbar />
      <div className="text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto opacity-90 bg-black shadow-lg shadow-white p-4 rounded-3xl">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-8">Vedant Vaghasiya</h1> {/* Change "Prince" to "Sahil" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden w-[19rem] h-[15rem] relative" style={{ zIndex: 4, position: 'relative' }}>
                <img
                  src={princeimg}
                  alt="Your Name"
                  className="w-full h-full object-cover transition-transform transform scale-100 hover:scale-110"
                />
              </div>
              <div className="mt-20">
                <a href="https://www.linkedin.com/in/vedant-vaghasiya-465418201/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} className="icon fa-xl" />
                </a>
                <a href="https://github.com/vedantvaghasiya" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} className="icon fa-xl" />
                </a>
                {/* <a href="https://www.instagram.com/sahilsaspara/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="icon fa-xl" />
                </a> */}
              </div>
            </div>
            <div className="mb-4 border p-2 rounded-2xl border-white">
              <p className="text-lg sm:text-lg leading-relaxed text-gray-100" style={{ fontFamily: 'font-serif' }}>
                I'm <span className="hover:scale-110">Vedant Vaghasiya</span>, a student and MERN stack developer with a strong passion for web development. My expertise lies in front-end technologies such as HTML, CSS, and React, enabling me to craft user-friendly web applications.

                On the back-end, I'm well-versed in Node.js and MongoDB, providing comprehensive full-stack solutions. I thrive in the ever-evolving world of web development, continually learning and growing.

                Beyond coding, I'm committed to delivering educational resources and practical solutions through projects like <span className="hover:scale-110">https://college-practicals-app.vercel.app/</span>. You're welcome to connect with me on LinkedIn or explore my GitHub profile.

                Thank you for visiting my profile, and let's connect!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
