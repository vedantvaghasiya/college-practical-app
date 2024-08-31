import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Earth from '../components/canvas/Earth'; // Import the Earth component
import '../App.css'
import yourImage from '../img/download.webp';



const Home = () => {
  return (
    <>

      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>College Practical Hub</title>
        <meta name="description" content="College Practical Hub" />
        <meta property="og:image" content={yourImage} />
      </Helmet> */}


      <Helmet>
        <title>College Practicals Hub</title>
        <meta name="description" content="Explore practical solutions and resources at College Practicals Hub. Find a list of practicals, code, and explanations." />
        <link rel="canonical" href="https://college-practicals.vercel.app/" />
        <meta name="keywords" content="college practicals, code, solutions, explanations" />
        <meta name="author" content="Prince Saspara" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="College Practicals Hub" />
        <meta property="og:description" content="Explore practical solutions and resources at College Practicals Hub. Find a list of practicals, code, and explanations." />
        <meta property="og:image" content={yourImage} />
        <meta property="og:url" content="https://college-practicals.vercel.app/" />
        <meta property="og:site_name" content="College Practicals Hub" />
      </Helmet>


      <Navbar />



      <header className="bg-opacity-0 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border-indigo-500 bg-opacity-50 shadow-lg shadow-slate-700 bg-[#71C9CE] px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold drop-shadow-xl tracking-tight text-white text-center">Explore College Practical Solutions</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[32rem] md:h-[25rem] gap-4 md:gap-8 lg:gap-12 xl:gap-16">
          <div className="order-2 md:order-1">
            <div className="p-4 md:p-10 md:mt-10 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Practical Solutions for Every{" "}
                <span className="text-[#71C9CE] font-extrabold drop-shadow-lg">
                  Student
                </span>
              </h1>
              <Link to="/subject">
                <button className="bg-white mt-5 hover:scale-105 translate  hover:-translate-x-y-1 shadow-lg shadow-slate-700 text-gray-800 font-semibold w-[10rem] sm:w-[12rem] h-12 sm:h-14 py-2 px-4 border border-gray-400 rounded-xl">
                  Subjects
                </button>
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 centered-earth">
            <Earth />
          </div>
        </div>
      </main>




      <Footer />

    </>
  )
}

export default Home;
