const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // Add more fields specific to the Subject model if needed.
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
