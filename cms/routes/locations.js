const express = require('express');
const { db } = require('../database/init');

const router = express.Router();

// Get all locations (public)
router.get('/', (req, res) => {
    try {
        const locations = db.get('locations').value();
        res.json(locations);
    } catch (error) {
        console.error('Get locations error:', error);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

module.exports = router;
