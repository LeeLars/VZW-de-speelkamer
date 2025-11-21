const express = require('express');
const { db } = require('../database/init');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all pricing (public)
router.get('/', (req, res) => {
    try {
        const pricing = db.get('pricing').sortBy('category').value();
        res.json(pricing);
    } catch (error) {
        console.error('Get pricing error:', error);
        res.status(500).json({ error: 'Failed to fetch pricing' });
    }
});

// Get single pricing item (public)
router.get('/:category', (req, res) => {
    try {
        const pricing = db.get('pricing').find({ category: req.params.category }).value();
        if (!pricing) {
            return res.status(404).json({ error: 'Pricing not found' });
        }
        res.json(pricing);
    } catch (error) {
        console.error('Get pricing error:', error);
        res.status(500).json({ error: 'Failed to fetch pricing' });
    }
});

// Update pricing (protected)
router.put('/:category', authMiddleware, (req, res) => {
    try {
        const { rate, description } = req.body;

        if (rate === undefined) {
            return res.status(400).json({ error: 'Rate is required' });
        }

        if (isNaN(rate) || rate < 0) {
            return res.status(400).json({ error: 'Rate must be a positive number' });
        }

        const existing = db.get('pricing').find({ category: req.params.category }).value();
        if (!existing) {
            return res.status(404).json({ error: 'Pricing category not found' });
        }

        const updated = {
            ...existing,
            rate: parseFloat(rate),
            description: description || existing.description,
            updated_at: new Date().toISOString()
        };

        db.get('pricing').find({ category: req.params.category }).assign(updated).write();
        res.json(updated);
    } catch (error) {
        console.error('Update pricing error:', error);
        res.status(500).json({ error: 'Failed to update pricing' });
    }
});

module.exports = router;
