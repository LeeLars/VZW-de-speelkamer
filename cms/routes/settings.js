const express = require('express');
const { queryOne } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get site settings (public) — currently holds the huishoudelijk reglement document url/name
router.get('/', async (req, res) => {
    try {
        const settings = await queryOne('SELECT * FROM site_settings WHERE id = 1');
        res.json(settings || {});
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// Update site settings (protected)
router.put('/', authMiddleware, async (req, res) => {
    try {
        const { reglement_url, reglement_name } = req.body;

        const updated = await queryOne(
            `INSERT INTO site_settings (id, reglement_url, reglement_name, updated_at)
             VALUES (1, $1, $2, CURRENT_TIMESTAMP)
             ON CONFLICT (id) DO UPDATE SET
                reglement_url = EXCLUDED.reglement_url,
                reglement_name = EXCLUDED.reglement_name,
                updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [reglement_url || null, reglement_name || null]
        );

        res.json(updated);
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

module.exports = router;
