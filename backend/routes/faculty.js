const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// Create Faculty
router.post('/', async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all Faculty
router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Faculty by ID
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Not found' });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Faculty
router.put('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faculty) return res.status(404).json({ message: 'Not found' });
    res.json(faculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Faculty
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
