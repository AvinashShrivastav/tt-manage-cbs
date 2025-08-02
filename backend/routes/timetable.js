const express = require('express');
const router = express.Router();
const TimetableEntry = require('../models/TimetableEntry');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const { sendNotificationEmail } = require('../utils/mail');
const { generateTimetablePdf } = require('../utils/pdfGenerator');


// Create Timetable Entry
router.post('/', async (req, res) => {
  try {
    const { faculty, room, day, timeSlot, semester } = req.body;

    // Faculty constraint: max 16 classes/week
    const facultyCount = await TimetableEntry.countDocuments({
      faculty: faculty,
      // Optionally filter by week if you want to support multiple weeks
    });
    if (facultyCount >= 16) {
      return res.status(400).json({ message: "Faculty has reached the maximum number of classes per week." });
    }

    // Room constraint: room must be free at that time
    const roomOccupied = await TimetableEntry.findOne({
      room: room,
      day: day,
      timeSlot: timeSlot,
    });
    if (roomOccupied) {
      return res.status(400).json({ message: "Room is already occupied at this time." });
    }

    // Faculty constraint: faculty must be free at that time
    const facultyOccupied = await TimetableEntry.findOne({
        faculty: faculty,
        day: day,
        timeSlot: timeSlot,
    });
    if (facultyOccupied) {
        return res.status(400).json({ message: "Faculty is already occupied at this time." });
    }

    const entry = new TimetableEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Timetable Entries
router.get('/', async (req, res) => {
  try {
    const { course, year, section, semester } = req.query;
    const filter = {};
    if (course) filter.course = course;
    if (year) filter.year = year;
    if (section) filter.section = section;
    if (semester) filter.semester = semester;
    const entries = await TimetableEntry.find(filter).populate('faculty').populate('room').populate('subject');
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get Timetable Entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await TimetableEntry.findById(req.params.id).populate('faculty').populate('room').populate('subject');
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Timetable Entry
router.put('/:id', async (req, res) => {
  try {
    const { faculty, room, day, timeSlot, semester } = req.body;

    // Faculty constraint: max 16 classes/week
    const facultyCount = await TimetableEntry.countDocuments({
      faculty: faculty,
      _id: { $ne: req.params.id } 
    });
    if (facultyCount >= 16) {
      return res.status(400).json({ message: "Faculty has reached the maximum number of classes per week." });
    }

    // Room constraint: room must be free at that time
    const roomOccupied = await TimetableEntry.findOne({
      room: room,
      day: day,
      timeSlot: timeSlot,
      _id: { $ne: req.params.id } 
    });
    if (roomOccupied) {
      return res.status(400).json({ message: "Room is already occupied at this time." });
    }

    // Faculty constraint: faculty must be free at that time
    const facultyOccupied = await TimetableEntry.findOne({
        faculty: faculty,
        day: day,
        timeSlot: timeSlot,
        _id: { $ne: req.params.id } 
    });
    if (facultyOccupied) {
        return res.status(400).json({ message: "Faculty is already occupied at this time." });
    }

    const entry = await TimetableEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Timetable Entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await TimetableEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Notify Students and Faculty
router.post('/notify', async (req, res) => {
  const { course, year, semester, section, entries } = req.body;

  try {
    // Get all students for the given course, year, and section
    const students = await Student.find({ course, year, section });

    // Get all unique faculty IDs from the timetable entries
    const facultyIds = [...new Set(entries.map(entry => entry.faculty))];
    const faculties = await Faculty.find({ '_id': { $in: facultyIds } });

    const studentEmails = students.map(student => student.email);
    const facultyEmails = faculties.map(faculty => faculty.email);
    const allEmails = [...studentEmails, ...facultyEmails];

    await sendNotificationEmail(allEmails, course, year, section);
    res.status(200).json({ message: 'Notifications sent successfully!' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export Timetable to PDF
router.post('/export-pdf', async (req, res) => {
  try {
    const pdfBuffer = await generateTimetablePdf(req.body);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=timetable.pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ message: 'Failed to generate PDF.' });
  }
});

module.exports = router;