const express = require('express');
const router = express.Router();
const TimetableEntry = require('../models/TimetableEntry');

// Create Timetable Entry
router.post('/', async (req, res) => {
  try {
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
    const entries = await TimetableEntry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Timetable Entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await TimetableEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Timetable Entry
router.put('/:id', async (req, res) => {
  try {
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

module.exports = router;
