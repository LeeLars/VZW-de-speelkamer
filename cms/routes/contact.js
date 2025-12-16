const express = require('express');
const { queryOne } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get contact info (public)
router.get('/', async (req, res) => {
    try {
        const contact = await queryOne('SELECT * FROM contact_info WHERE id = 1');
        res.json(contact || {});
    } catch (error) {
        console.error('Get contact info error:', error);
        res.status(500).json({ error: 'Failed to fetch contact info' });
    }
});

// Update contact info (protected)
router.put('/', authMiddleware, async (req, res) => {
    try {
        const { email, email2, phone, phone2, gsm, gsm2, facebook, address } = req.body;

        const updated = await queryOne(
            `INSERT INTO contact_info (id, email, email2, phone, phone2, gsm, gsm2, facebook, address, updated_at)
             VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
             ON CONFLICT (id) DO UPDATE SET
                email = EXCLUDED.email,
                email2 = EXCLUDED.email2,
                phone = EXCLUDED.phone,
                phone2 = EXCLUDED.phone2,
                gsm = EXCLUDED.gsm,
                gsm2 = EXCLUDED.gsm2,
                facebook = EXCLUDED.facebook,
                address = EXCLUDED.address,
                updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [
                email || null,
                email2 || null,
                phone || null,
                phone2 || null,
                gsm || null,
                gsm2 || null,
                facebook || null,
                address || null
            ]
        );

        res.json(updated);
    } catch (error) {
        console.error('Update contact info error:', error);
        res.status(500).json({ error: 'Failed to update contact info' });
    }
});

module.exports = router;
