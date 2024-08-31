const express = require('express');
const router = express.Router();

const Subject = require('../models/Subject');
const Practical = require('../models/Practical');





module.exports = router;

router.post('/subjects', async (req, res) => {
  try {
    const newSubject = new Subject({
      subjectName: req.body.subjectName,
      imageUrl: req.body.imageUrl,
      // Add other fields as needed
    });

    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    console.error('Error while saving subject:', err);
    res.status(400).json({ error: err.message });
  }
});


// Create a new practical
// Create a new practical
router.post('/practicals', async (req, res) => {
  try {
    const newPractical = new Practical({
      aim: req.body.aim,
      subjectId: req.body.subjectId, // Include subjectId
    });

    const savedPractical = await newPractical.save();
    res.status(201).json(savedPractical);
  } catch (err) {
    console.error('Error while saving practical:', err);
    res.status(400).json({ error: err.message });
  }
});


// Create a new solution
// Create a new solution
// Create a new solution
router.post('/solutions', async (req, res) => {
  try {
    const { practicalId, solutions } = req.body;

    // Check if all required fields are provided
    if (!practicalId || !solutions || solutions.length === 0) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create an array of solution objects
    const solutionArray = solutions.map((solution) => ({
      solutionCode: solution.solutionCode,
      codeOutput: solution.codeOutput,
      explanation: solution.explanation,
    }));

    // Update the corresponding Practical document with the new solutions
    await Practical.findByIdAndUpdate(
      practicalId,
      { $push: { solutions: { $each: solutionArray } } },
      { new: true }
    );

    // Respond with the created solutions
    res.status(201).json(solutionArray);
  } catch (err) {
    console.error('Error while saving solutions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// Get a list of subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    console.error('Error fetching subjects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/practicals', async (req, res) => {
  try {
    const practicals = await Practical.find();
    const subjectIds = practicals.map((practical) => practical.subjectId);
    const subjects = await Subject.find({ _id: { $in: subjectIds } });

    // Create a map of subject IDs to subject names for efficient lookup
    const subjectMap = {};
    subjects.forEach((subject) => {
      subjectMap[subject._id] = subject.subjectName;
    });

    // Add the subjectName property to each practical
    const practicalsWithSubjects = practicals.map((practical) => ({
      ...practical.toObject(),
      subjectName: subjectMap[practical.subjectId] || 'N/A',
    }));

    res.json(practicalsWithSubjects);
  } catch (err) {
    console.error('Error fetching practicals:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Modify the practicals route to handle the search query
router.get('/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || ''; // Get the search query from request parameters

    const query = { subjectId };
    if (searchQuery) {
      // Include the search query in the MongoDB query to filter practicals
      query.aim = { $regex: new RegExp(searchQuery, 'i') };
    }

    const practicals = await Practical.find(query)
      .skip(skip)
      .limit(limit);

    res.json({ practicals });
  } catch (error) {
    console.error('Error fetching practicals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get a list of practicals by subjectId with pagination and optional search query
router.get('/practicals/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.search || ''; // Get the search query from request parameters

    const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const query = { subjectId };
if (searchQuery) {
  // Include the escaped search query in the MongoDB query to filter practicals
  query.aim = { $regex: new RegExp(escapedSearchQuery, 'i') };
}

    const practicals = await Practical.find(query)
      .skip(skip)
      .limit(limit);

    res.json({ practicals });
  } catch (error) {
    console.error('Error fetching practicals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Create a solution
router.post('/', async (req, res) => {
  try {
    const { practicalId, solutionData } = req.body;

    // Find the practical by ID
    const practical = await Practical.findById(practicalId);

    if (!practical) {
      return res.status(404).json({ message: 'Practical not found' });
    }

    // Add the new solution to the solutions array
    practical.solutions.push(solutionData);

    // Save the updated practical document
    await practical.save();

    res.status(201).json(practical.solutions);
  } catch (error) {
    console.error('Error creating solution:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/practicals/:practicalId/solutions', async (req, res) => {
  try {
    const practicalId = req.params.practicalId;
    const practical = await Practical.findById(practicalId);

    if (!practical) {
      return res.status(404).json({ message: 'Practical not found' });
    }

    const responseData = {
      aim: practical.aim,
      solutions: practical.solutions,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching practical solutions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
