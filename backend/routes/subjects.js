const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Create Subject
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Subject by ID
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Subject
router.put('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return res.status(404).json({ message: 'Not found' });
    res.json(subject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Subject
router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
