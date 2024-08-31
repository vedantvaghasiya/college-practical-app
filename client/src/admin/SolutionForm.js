import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';

const Quill = ReactQuill.Quill;

Quill.register('modules/imageResize', ImageResize);

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  imageResize: {
    displaySize: true,
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
  },
};

const Editor = ({ onChange, value }) => {
  const handleChange = (html) => {
    onChange(html);
  };

  return <ReactQuill onChange={handleChange} value={value} modules={modules} />;
};

const SolutionForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [practicals, setPracticals] = useState([]);
  const [selectedPracticalId, setSelectedPracticalId] = useState('');
  const [solutions, setSolutions] = useState([
    { solutionCode: '', codeOutput: '', explanation: '', imageURL: '' },
  ]);

  useEffect(() => {
    // Fetch subjects
    axios
      .get('https://college-practical.vercel.app/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch practicals based on the selected subject
    if (selectedSubjectId) {
      axios
        .get(`https://college-practical.vercel.app/api/practicals/${selectedSubjectId}`)
        .then((response) => {
          setPracticals(response.data.practicals);
        })
        .catch((error) => {
          console.error('Error fetching practicals:', error);
        });
    }
  }, [selectedSubjectId]);

  const addSolution = () => {
    setSolutions([...solutions, { solutionCode: '', codeOutput: '', explanation: '', imageURL: '' }]);
  };

  const handleSolutionChange = async (index, field, value) => {
    const updatedSolutions = [...solutions];

    if (field === 'imageURL' && value instanceof File) {
      try {
        const compressedImage = await resizeImage(value);
        updatedSolutions[index][field] = compressedImage;
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    } else {
      updatedSolutions[index][field] = value;
    }

    setSolutions(updatedSolutions);
  };

  const resizeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const maxWidth = 800;
          const ratio = maxWidth / img.width;
          const newWidth = maxWidth;
          const newHeight = img.height * ratio;

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          canvas.toBlob(
            (blob) => {
              const resizedImage = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedImage);
            },
            file.type,
            0.8
          );
        };
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await Promise.all(
        solutions.map(async (solution) => {
          if (solution.imageURL instanceof File) {
            const formData = new FormData();
            formData.append('image', solution.imageURL);
            const response = await axios.post('https://college-practical.vercel.app/api/upload', formData);
            return response.data.imageUrl;
          } else {
            return solution.imageURL;
          }
        })
      );

      const updatedSolutions = solutions.map((solution, index) => ({
        ...solution,
        imageURL: imageUrls[index],
      }));

      const response = await axios.post('https://college-practical.vercel.app/api/solutions', {
        practicalId: selectedPracticalId,
        solutions: updatedSolutions,
      });

      console.log('Solutions created:', response.data);
    } catch (error) {
      console.error('Error creating solutions:', error);
    }
  };
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl text-white font-semibold mb-4">Create a Solution</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Select a Subject</label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full p-2 bg-gray-200 rounded"
          >
            <option value="">Select a Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>

        {selectedSubjectId && (
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Select a Practical</label>
            <select
              value={selectedPracticalId}
              onChange={(e) => setSelectedPracticalId(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded"
            >
              <option value="">Select a Practical</option>
              {practicals.length > 0 ? (
                practicals.map((practical) => (
                  <option key={practical._id} value={practical._id}>
                    {practical.aim}
                  </option>
                ))
              ) : (
                <option value="">No practicals available for the selected subject</option>
              )}
            </select>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-2xl text-white font-semibold mb-2">Solutions</h2>
          {solutions.map((solution, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl text-white font-semibold mb-2">Solution {index + 1}</h3>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Solution Code</label>
                <div
                  contentEditable="true"
                  onInput={(e) =>
                    handleSolutionChange(index, 'solutionCode', e.currentTarget.innerHTML)
                  }
                  className="w-full p-2 bg-gray-200 rounded"
                  dangerouslySetInnerHTML={{ __html: solution.solutionCode }}
                ></div>
              </div>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Code Output</label>
                <div
                  contentEditable="true"
                  onInput={(e) =>
                    handleSolutionChange(index, 'codeOutput', e.currentTarget.innerHTML)
                  }
                  className="w-full p-2 bg-gray-200 rounded"
                  dangerouslySetInnerHTML={{ __html: solution.codeOutput }}
                ></div>
              </div>
              <div className="mb-4">
                <label className="block text-white font-medium mb-2">Explanation</label>
                <Editor onChange={(value) => handleSolutionChange(index, 'explanation', value)} value={solution.explanation} />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSolution}
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded mb-4 hover:bg-blue-600"
          >
            Add Solution
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Submit Solutions
        </button>
      </form>
    </div>
  );
};

export default SolutionForm;
