const mongoose = require('mongoose');

const TimetableEntrySchema = new mongoose.Schema({
  course: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true },
  section: { type: String, required: true },
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  subjectCode: { type: String, required: true },
  subjectType: { type: String, enum: ['theory', 'lab', 'tutorial'], required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  labGroup: { type: String, enum: ['G1', 'G2', 'Both', ''], required: false },
}, { timestamps: true });

module.exports = mongoose.model('TimetableEntry', TimetableEntrySchema);
