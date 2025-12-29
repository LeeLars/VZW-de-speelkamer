const express = require('express');
const { query, queryOne, queryAll } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all locations (public)
router.get('/', async (req, res) => {
    try {
        const locations = await queryAll(
            'SELECT * FROM locations ORDER BY created_at ASC'
        );
        res.json(locations);
    } catch (error) {
        console.error('Get locations error:', error);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

// Get single location (public)
router.get('/:id', async (req, res) => {
    try {
        const location = await queryOne(
            'SELECT * FROM locations WHERE id = $1',
            [parseInt(req.params.id)]
        );
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        res.json(location);
    } catch (error) {
        console.error('Get location error:', error);
        res.status(500).json({ error: 'Failed to fetch location' });
    }
});

// Create location (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, address, description, image_url, phone, phone2, email, email2 } = req.body;

        const resolvedName = name || 'Locatie';
        const resolvedAddress = address || '';
        
        const newLocation = await queryOne(
            `INSERT INTO locations (name, address, description, image_url, phone, phone2, email, email2)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [
                resolvedName,
                resolvedAddress,
                description || '',
                image_url || './images/location-placeholder.jpg',
                phone || '',
                phone2 || '',
                email || '',
                email2 || ''
            ]
        );
        
        res.status(201).json(newLocation);
    } catch (error) {
        console.error('Create location error:', error);
        res.status(500).json({ error: 'Failed to create location' });
    }
});

// Update location (protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const locationId = parseInt(req.params.id);
        
        const location = await queryOne(
            'SELECT * FROM locations WHERE id = $1',
            [locationId]
        );
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        const { name, address, description, image_url, phone, phone2, email, email2 } = req.body;
        
        const updatedLocation = await queryOne(
            `UPDATE locations SET
                name = COALESCE($1, name),
                address = COALESCE($2, address),
                description = $3,
                image_url = COALESCE($4, image_url),
                phone = $5,
                phone2 = $6,
                email = $7,
                email2 = $8,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $9
             RETURNING *`,
            [
                name,
                address,
                description !== undefined ? description : location.description,
                image_url,
                phone !== undefined ? phone : location.phone,
                phone2 !== undefined ? phone2 : location.phone2,
                email !== undefined ? email : location.email,
                email2 !== undefined ? email2 : location.email2,
                locationId
            ]
        );
        
        res.json(updatedLocation);
    } catch (error) {
        console.error('Update location error:', error);
        res.status(500).json({ error: 'Failed to update location' });
    }
});

// Delete location (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const locationId = parseInt(req.params.id);
        
        const location = await queryOne(
            'SELECT * FROM locations WHERE id = $1',
            [locationId]
        );
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        await query(
            'DELETE FROM locations WHERE id = $1',
            [locationId]
        );
        
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error('Delete location error:', error);
        res.status(500).json({ error: 'Failed to delete location' });
    }
});

module.exports = router;
