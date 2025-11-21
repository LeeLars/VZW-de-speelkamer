const express = require('express');
const { db } = require('../database/init');
const authMiddleware = require('../middleware/auth');

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

// Get single location (public)
router.get('/:id', (req, res) => {
    try {
        const location = db.get('locations')
            .find({ id: req.params.id })
            .value();
        
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
router.post('/', authMiddleware, (req, res) => {
    try {
        const { name, address, description, image, phone, email } = req.body;
        
        if (!name || !address) {
            return res.status(400).json({ error: 'Name and address are required' });
        }
        
        const newLocation = {
            id: `loc${Date.now()}`,
            name,
            address,
            description: description || '',
            image: image || './images/location-placeholder.jpg',
            phone: phone || '',
            email: email || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        db.get('locations').push(newLocation).write();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error('Create location error:', error);
        res.status(500).json({ error: 'Failed to create location' });
    }
});

// Update location (protected)
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const location = db.get('locations')
            .find({ id: req.params.id })
            .value();
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        const { name, address, description, image, phone, email } = req.body;
        
        const updatedLocation = {
            ...location,
            name: name || location.name,
            address: address || location.address,
            description: description !== undefined ? description : location.description,
            image: image || location.image,
            phone: phone !== undefined ? phone : location.phone,
            email: email !== undefined ? email : location.email,
            updated_at: new Date().toISOString()
        };
        
        db.get('locations')
            .find({ id: req.params.id })
            .assign(updatedLocation)
            .write();
        
        res.json(updatedLocation);
    } catch (error) {
        console.error('Update location error:', error);
        res.status(500).json({ error: 'Failed to update location' });
    }
});

// Delete location (protected)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const location = db.get('locations')
            .find({ id: req.params.id })
            .value();
        
        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        db.get('locations')
            .remove({ id: req.params.id })
            .write();
        
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.error('Delete location error:', error);
        res.status(500).json({ error: 'Failed to delete location' });
    }
});

module.exports = router;
