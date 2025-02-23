// backend/routes/applications.js
const express = require('express');
const router = express.Router();
const JobApplication = require('../models/JobApplication');

// Get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await JobApplication.find();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new application
router.post('/', async (req, res) => {
    const application = new JobApplication(req.body);
    try {
        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get an application by ID
router.get('/:id', async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an application
router.put('/:id', async (req, res) => {
    try {
        const updatedApplication = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an application
router.delete('/:id', async (req, res) => {
    try {
        const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
        res.json({ message: 'Application deleted', deletedApplication });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
