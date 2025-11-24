const express = require('express');
const { query, queryOne, queryAll } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all pricing (public)
router.get('/', async (req, res) => {
    try {
        const pricing = await queryAll(
            'SELECT * FROM pricing ORDER BY category ASC'
        );
        res.json(pricing);
    } catch (error) {
        console.error('Get pricing error:', error);
        res.status(500).json({ error: 'Failed to fetch pricing' });
    }
});

// Get single pricing item (public)
router.get('/:category', async (req, res) => {
    try {
        const pricing = await queryOne(
            'SELECT * FROM pricing WHERE category = $1',
            [req.params.category]
        );
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
router.put('/:category', authMiddleware, async (req, res) => {
    try {
        const { rate, description } = req.body;

        if (rate === undefined) {
            return res.status(400).json({ error: 'Rate is required' });
        }

        if (isNaN(rate) || rate < 0) {
            return res.status(400).json({ error: 'Rate must be a positive number' });
        }

        const existing = await queryOne(
            'SELECT * FROM pricing WHERE category = $1',
            [req.params.category]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Pricing category not found' });
        }

        const updated = await queryOne(
            `UPDATE pricing SET
                rate = $1,
                description = COALESCE($2, description),
                updated_at = CURRENT_TIMESTAMP
             WHERE category = $3
             RETURNING *`,
            [parseFloat(rate), description, req.params.category]
        );

        res.json(updated);
    } catch (error) {
        console.error('Update pricing error:', error);
        res.status(500).json({ error: 'Failed to update pricing' });
    }
});

module.exports = router;
