const express = require('express');
const { query, queryOne, queryAll } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all site images (optionally filter by section)
router.get('/', async (req, res) => {
    try {
        const { section } = req.query;
        const images = section
            ? await queryAll(
                'SELECT * FROM site_images WHERE section = $1 ORDER BY priority ASC, created_at ASC',
                [section]
            )
            : await queryAll('SELECT * FROM site_images ORDER BY section ASC, priority ASC, created_at ASC');
        res.json(images);
    } catch (error) {
        console.error('Get site images error:', error);
        res.status(500).json({ error: 'Failed to fetch site images' });
    }
});

// Get single site image
router.get('/:id', async (req, res) => {
    try {
        const image = await queryOne(
            'SELECT * FROM site_images WHERE id = $1',
            [parseInt(req.params.id)]
        );
        if (!image) {
            return res.status(404).json({ error: 'Site image not found' });
        }
        res.json(image);
    } catch (error) {
        console.error('Get site image error:', error);
        res.status(500).json({ error: 'Failed to fetch site image' });
    }
});

// Create site image
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { section, image_key, title, description, image_url, priority } = req.body;

        if (!section || !image_key || !image_url) {
            return res.status(400).json({ error: 'section, image_key en image_url zijn verplicht' });
        }

        const newImage = await queryOne(
            `INSERT INTO site_images (section, image_key, title, description, image_url, priority)
             VALUES ($1, $2, $3, $4, $5, COALESCE($6, 0))
             RETURNING *`,
            [section, image_key, title || null, description || null, image_url, priority || 0]
        );

        res.status(201).json(newImage);
    } catch (error) {
        if (error && error.message && error.message.includes('duplicate key')) {
            return res.status(400).json({ error: 'Image key moet uniek zijn' });
        }
        console.error('Create site image error:', error);
        res.status(500).json({ error: 'Failed to create site image' });
    }
});

// Update site image
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const imageId = parseInt(req.params.id);
        const existing = await queryOne(
            'SELECT * FROM site_images WHERE id = $1',
            [imageId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Site image niet gevonden' });
        }

        const { section, image_key, title, description, image_url, priority } = req.body;

        const updated = await queryOne(
            `UPDATE site_images SET
                section = COALESCE($1, section),
                image_key = COALESCE($2, image_key),
                title = $3,
                description = $4,
                image_url = COALESCE($5, image_url),
                priority = COALESCE($6, priority),
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $7
             RETURNING *`,
            [
                section,
                image_key,
                title !== undefined ? title : existing.title,
                description !== undefined ? description : existing.description,
                image_url,
                priority !== undefined ? priority : existing.priority,
                imageId
            ]
        );

        res.json(updated);
    } catch (error) {
        if (error && error.message && error.message.includes('duplicate key')) {
            return res.status(400).json({ error: 'Image key moet uniek zijn' });
        }
        console.error('Update site image error:', error);
        res.status(500).json({ error: 'Failed to update site image' });
    }
});

// Delete site image
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const imageId = parseInt(req.params.id);
        const existing = await queryOne(
            'SELECT * FROM site_images WHERE id = $1',
            [imageId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Site image niet gevonden' });
        }

        await query(
            'DELETE FROM site_images WHERE id = $1',
            [imageId]
        );

        res.json({ success: true, message: 'Site image verwijderd' });
    } catch (error) {
        console.error('Delete site image error:', error);
        res.status(500).json({ error: 'Failed to delete site image' });
    }
});

module.exports = router;
