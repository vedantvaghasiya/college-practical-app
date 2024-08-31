import React, { useState } from 'react';
import axios from 'axios';

const SubjectForm = () => {

    const [subjectData, setSubjectData] = useState({
      subjectName: '', // Updated field name
      imageUrl: '',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://college-practical.vercel.app/api/subjects', subjectData);

      if (response.status === 201) {
        console.log('Subject added successfully');
        // Clear the form after successful submission
        setSubjectData({
          name: '', // Use "name" instead of "subjectName"
          imageUrl: '',
        });
      } else {
        console.error('Failed to add subject');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({
      ...subjectData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-white mb-4">Add Subject</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
      <label htmlFor="subjectName" className="block text-white">
        Subject Name:
      </label>
      <input
        type="text"
        name="subjectName" // Updated field name
        value={subjectData.subjectName}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
    </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-white">
            Image URL:
          </label>
          <input
            type="text"
            name="imageUrl"
            value={subjectData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Subject
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubjectForm;
