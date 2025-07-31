const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true },
  totalCredits: { type: Number, required: true },
  theoryCredits: { type: Number, required: true },
  labCredits: { type: Number, required: true },
  tutorialCredits: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);
