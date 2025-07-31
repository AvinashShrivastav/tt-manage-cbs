const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  subjects: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model('Faculty', FacultySchema);
