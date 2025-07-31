const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  section: { type: String, required: true },
  group: { type: String, enum: ['G1', 'G2'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
