const mongoose = require('mongoose');

const practicalSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  aim: {
    type: String,
    required: true,
  },
  solutions: [
    {
      solutionCode: String,
      codeOutput: String,
      explanation: String,
    },
  ],
});

const Practical = mongoose.model('Practical', practicalSchema);

module.exports = Practical;
