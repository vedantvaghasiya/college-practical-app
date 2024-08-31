import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='hero'>
      <div className="text-center text-white hero-content">
        <div className="max-w-lg mx-auto">
          <h1 className="text-8xl font-bold mb-8">
            Oops!
          </h1>
          <p className='text-5xl mb-8'>
            404 - Page not found!
          </p>
          <div className="flex justify-center"> {/* Center the button */}
            <Link to='/'>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                <FaHome className="mr-2" />
                Back To Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
