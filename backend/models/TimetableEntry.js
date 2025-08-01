const mongoose = require('mongoose');

const TimetableEntrySchema = new mongoose.Schema({
  course: { type: String, required: true },
  year: { type: String, required: true },
  section: { type: String, required: true },
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  subject: { type: String, required: true },
  subjectCode: { type: String, required: true },
  subjectType: { type: String, enum: ['theory', 'lab', 'tutorial'], required: true },
  faculty: { type: String, required: true },
  room: { type: String, required: true },
  labGroup: { type: String, enum: ['G1', 'G2', 'Both', ''], required: false },
}, { timestamps: true });

module.exports = mongoose.model('TimetableEntry', TimetableEntrySchema);
