import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PracticalForm = () => {
  const [practicalData, setPracticalData] = useState({
    aim: '',
    subjectId: '', // Add subjectId field
  });

  const [subjects, setSubjects] = useState([]); // To store the list of subjects

  useEffect(() => {
    // Fetch the list of subjects from the backend
    axios.get('https://college-practical.vercel.app/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://college-practical.vercel.app/api/practicals', practicalData);

      if (response.status === 201) {
        console.log('Practical added successfully');
        // Clear the form after successful submission
        setPracticalData({
          aim: '',
          subjectId: '', // Clear subjectId field
        });
      } else {
        console.error('Failed to add practical');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPracticalData({
      ...practicalData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Add Practical</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="aim" className="block text-white">
            Aim:
          </label>
          <textarea
            type="text"
            name="aim"
            value={practicalData.aim}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subjectId" className="block text-white">
            Subject:
          </label>
          <select
            name="subjectId"
            value={practicalData.subjectId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Practical
          </button>
        </div>
      </form>
    </div>
  );
};

export default PracticalForm;
