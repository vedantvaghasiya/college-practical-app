import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import mainlogo from '../img/download.webp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import download from '../img/download.png'
import downloadApk from '../download/college-practical-hub.apk'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="bg-[#000] shadow-md shadow-slate-700 max-w-[100%]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to="/" >
                      <img className="h-[60px] w-18" src={mainlogo} alt="Your Company" />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <ul className="flex">
                        <li className="mr-6">
                          <Link to="/" className="text-white hover:text-gray-300">
                            Home
                          </Link>
                        </li>
                        <li className="mr-6">
                          <Link to="/about" className="text-white hover:text-gray-300">
                            Developer
                          </Link>
                        </li>
                      
                        <li className="mr-6">
                          <Link to="/contactus" className="text-white hover:text-gray-300">
                            Contact Us
                          </Link>
                        </li>
                        <li className="mr-6">
                          <Link to="/Whiteboard" className="text-white hover:text-gray-300">
                            Whiteboard
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* <a href={downloadApk} className="text-white" >

                      <img
                        className=' transition-transform transform scale-100 hover:scale-110'
                        src={download}
                        alt=""
                        style={{
                          width: '30px', // Adjust the size as needed
                          height: '30px', // Adjust the size as needed
                          filter: 'grayscale(100%)', // Set to grayscale for gray color
                          transition: 'filter 0.3s',
                          // Add a smooth transition for the hover effect
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0%)'; // Remove grayscale on hover
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.filter = 'grayscale(100%)'; // Restore grayscale on mouse out
                        }}
                      />
                    </a> */}

                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            {/* Mobile menu */}
            {isOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    to="/about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Home
                  </Link>
               
                  <Link
                    to="/contactus"
                    className="text-blue-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/Whiteboard"
                    className="text-blue-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Whiteboard
                  </Link>

                  <div className="ml-4 flex items-center md:ml-6">
                    {/* <a href={downloadApk} className='content-center'>

                      <button className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                      >Download Android App </button>
                    </a> */}

                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;















