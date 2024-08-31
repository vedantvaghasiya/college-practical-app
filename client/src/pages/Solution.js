import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Spinner';
import NotFound from '../components/NotFound';
import { Helmet } from 'react-helmet';
import { faMoon, faSun, faCopy, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import html2canvas from 'html2canvas'; // Import html2canvas
import '../App.css';

const Solution = () => {
  const { practicalId } = useParams();
  const [practical, setPractical] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [outputBackgroundBlack, setOutputBackgroundBlack] = useState(false);
  const outputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [explanationTheme, setExplanationTheme] = useState('light'); // 'light' or 'dark'


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://college-practical.vercel.app/api/practicals/${practicalId}/solutions`);
        setPractical(response.data);
        setSolutions(response.data.solutions);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [practicalId]);

  const copyCodeToClipboard = (code) => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = code;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    toast.success('Code copied to clipboard!', {
      position: 'top-center',
      autoClose: 2000,
    });
  };

  const toggleOutputBackgroundColor = () => {
    setOutputBackgroundBlack(!outputBackgroundBlack);
  };

  const downloadImage = () => {
    const outputElement = outputRef.current;

    html2canvas(outputElement).then((canvas) => {
      const imageDataURL = canvas.toDataURL('image/png');

      // Create a temporary link for downloading
      const downloadLink = document.createElement('a');
      downloadLink.href = imageDataURL;
      downloadLink.download = 'output_image.png';

      // Append the link to the document
      document.body.appendChild(downloadLink);

      // Trigger a click on the link to initiate the download
      downloadLink.click();

      // Remove the link from the document
      document.body.removeChild(downloadLink);

      toast.success('Image downloaded!', {
        position: 'top-center',
        autoClose: 2000,
      });
    });
  };

  const copyImageToClipboard = () => {
    const outputElement = outputRef.current;

    html2canvas(outputElement).then((canvas) => {
      canvas.toBlob((blob) => {
        const clipboardData = new ClipboardItem({ 'image/png': blob });

        navigator.clipboard.write([clipboardData])
          .then(() => {
            toast.success('Image copied to clipboard!', {
              position: 'top-center',
              autoClose: 2000,
            });
          })
          .catch((error) => {
            console.error('Error copying image to clipboard:', error);
            toast.error('Failed to copy image to clipboard', {
              position: 'top-center',
              autoClose: 2000,
            });
          });
      }, 'image/png');
    });
  };



  if (loading) {
    return <Loader />;
  }
  if (!practical || solutions.length === 0) {
    return <NotFound />;
  }

  const getExplanationThemeStyle = (color) => {
    switch (color) {
      case '#78350f':
        return 'bg-[#78350f] text-white';
      case '#292524':
        return 'bg-[#292524] text-white';
      case '#404040':
        return 'bg-[#404040] text-white';
      case '#fef3c7':
        return 'bg-[#1B1A55] text-white';
      case 'purple-500':
        return 'bg-[#12372A] text-white';
      case 'indigo-500':
        return 'bg-[#11235A] text-white';
      case 'pink-500':
        return 'bg-[#618264] text-black';
      case 'teal-500':
        return 'bg-[#362706] text-white';
      case 'orange-500':
        return 'bg-[#000000] text-white';
      case '#164e63':
        return 'bg-[#164e63] text-white';
      default:
        return 'bg-gray-200';
    }
  };




  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };




  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{practical?.aim} college practical hub</title>
        <meta name="description" content={practical?.aim} />
      </Helmet>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 Aim-hover">
          <h3 className="text-lg font-medium mb-4">Topic: {practical.aim}</h3>
        </div>
        {solutions.map((solution) => (
          <div key={solution._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            {solution.solutionCode && solution.solutionCode.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <strong>Code:</strong>
                <div className="relative">
                  <button
                    onClick={() => copyCodeToClipboard(solution.solutionCode)}
                    className="absolute top-2 right-2 p-1 rounded cursor-pointer icon fa-xl "
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                  <SyntaxHighlighter language="c" style={prism}>
                    {solution.solutionCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {solution.codeOutput && solution.codeOutput.length > 0 && (
              <div>
                <div className="relative">
                  <strong>Output:</strong>
                  <button
                    onClick={toggleOutputBackgroundColor}
                    className="absolute top-2 right-2 p-1 rounded cursor-pointer icon fa-xl"
                  >
                    {outputBackgroundBlack ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                  </button>
                </div>
                <div
                  ref={outputRef}
                  className={`mt-4 ${outputBackgroundBlack ? 'bg-black border-black text-white' : 'bg-white'}`}
                >
                  {solution.codeOutput && solution.codeOutput.length > 0 && (
                    <pre className="p-4 border rounded-lg whitespace-pre-wrap">{solution.codeOutput}</pre>
                  )}
                </div>
                <button
                  onClick={downloadImage}
                  className="mt-2 bg-stone-900 hover:bg-stone-300 transition-transform transform text-white hover:text-stone-900 scale-95 hover:scale-100 font-bold py-2 px-4 rounded-xl"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download Image
                </button>
                <button
                  onClick={copyImageToClipboard}
                  className="mt-2 bg-stone-900 hover:bg-stone-300 transition-transform transform text-white hover:text-stone-900 scale-95 hover:scale-100 font-bold py-2 px-4 rounded-xl"
                >
                  <FontAwesomeIcon icon={faCopy} className="mr-2" />
                  Copy Image to Clipboard
                </button>
              </div>
            )}


            {solution.explanation && solution.explanation.length > 0 && (
              <div className={`mt-4 ${getExplanationThemeStyle(explanationTheme)}`}>
                     <div className={`mt-2 flex space-x-2`}>
              {['#78350f', '#292524', '#404040', '#fef3c7', 'purple-500', 'indigo-500', 'pink-500', 'teal-500', 'orange-500', '#164e63'].map((color) => (
                <button
                  key={color}
                  onClick={() => setExplanationTheme(color)}
                  className={`rounded-full mb-4 h-8 w-20 border ${getExplanationThemeStyle(color)} focus:outline-none`}
                ></button>
              ))}
            </div>
                <strong>Explanation:</strong>
                <br />
                <br />
                <pre
                  className="p-4 rounded-lg whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: solution.explanation }}
                ></pre>
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Solution;
