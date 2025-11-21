const express = require('express');
const { db } = require('../database/init');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all activities (public)
router.get('/', (req, res) => {
    try {
        const activities = db.get('activities').sortBy('start_date').value();
        res.json(activities);
    } catch (error) {
        console.error('Get activities error:', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

// Get single activity (public)
router.get('/:id', (req, res) => {
    try {
        const activity = db.get('activities').find({ id: req.params.id }).value();
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        console.error('Get activity error:', error);
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});

// Create activity (protected)
router.post('/', authMiddleware, (req, res) => {
    try {
        const { id, title, type, start_date, end_date, hours, price, google_form_url, description } = req.body;

        if (!id || !title || !type || !start_date || !hours || !price || !google_form_url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!['CAMP', 'FREE_DAY'].includes(type)) {
            return res.status(400).json({ error: 'Invalid activity type' });
        }

        const existing = db.get('activities').find({ id }).value();
        if (existing) {
            return res.status(409).json({ error: 'Activity with this ID already exists' });
        }

        const newActivity = {
            id,
            title,
            type,
            start_date,
            end_date: end_date || null,
            hours,
            price,
            google_form_url,
            description: description || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        db.get('activities').push(newActivity).write();
        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Create activity error:', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
});

// Update activity (protected)
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const { title, type, start_date, end_date, hours, price, google_form_url, description } = req.body;

        const existing = db.get('activities').find({ id: req.params.id }).value();
        if (!existing) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const updated = {
            ...existing,
            title: title || existing.title,
            type: type || existing.type,
            start_date: start_date || existing.start_date,
            end_date: end_date !== undefined ? end_date : existing.end_date,
            hours: hours || existing.hours,
            price: price || existing.price,
            google_form_url: google_form_url || existing.google_form_url,
            description: description !== undefined ? description : existing.description,
            updated_at: new Date().toISOString()
        };

        db.get('activities').find({ id: req.params.id }).assign(updated).write();
        res.json(updated);
    } catch (error) {
        console.error('Update activity error:', error);
        res.status(500).json({ error: 'Failed to update activity' });
    }
});

// Delete activity (protected)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const existing = db.get('activities').find({ id: req.params.id }).value();
        if (!existing) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        db.get('activities').remove({ id: req.params.id }).write();
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Delete activity error:', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});

module.exports = router;
