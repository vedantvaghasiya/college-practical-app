import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from './Spinner';
import { Helmet } from 'react-helmet';

const SubjectListing = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add state variables for search
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter subjects based on the search query
    const filtered = subjects.filter((subject) =>
      subject.subjectName.toLowerCase().includes(query)
    );
    setFilteredSubjects(filtered);
  };

  useEffect(() => {
    axios
      .get('https://college-practical.vercel.app/api/subjects')
      .then((response) => {
        console.log('API Response:', response.data);
        setSubjects(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
        setLoading(false);
        setError('Error fetching subjects. Please try again later.');
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-8">
<Helmet>
  <meta charSet="utf-8" />
  <title>All Subjects</title>
  <meta
    name="description"
    content={`All subjects: ${subjects.map(subject => subject.subjectName).join(', ')}`}
  />
</Helmet>


      <h1 className="text-2xl text-white font-semibold mb-4">All Subjects</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Subjects..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border bg-white opacity-80 rounded-md w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {(searchQuery ? filteredSubjects : subjects).map((subject) => (
          <Link to={`/subject/${subject._id}`} key={subject._id}>
            <div className="bg-white opacity-80 p-4 rounded-xl shadow-lg hover:shadow-slate-300 hover:opacity-100 hover:scale-110 transition hover:-translate--1">
              <img
                src={subject.imageUrl}
                alt={subject.description}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-center">
                {subject.subjectName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectListing;
